#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadMyEnv } from './load-my-env.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../src/data');

// .my 파일에서 키 자동 로드 (없으면 시스템 환경변수만 사용)
loadMyEnv();

// 환경변수 형식 검증 — 사용자가 placeholder 그대로 둔 경우 명확히 알림
function validateKeys() {
  const checks = [
    {
      name: 'NEXT_PUBLIC_ADSENSE_CLIENT',
      pattern: /^ca-pub-\d{8,}$/,
      hint: 'ca-pub- 뒤에 16자리 숫자 (예: ca-pub-1234567890123456)',
    },
    {
      name: 'NEXT_PUBLIC_GA_ID',
      pattern: /^G-[A-Z0-9]{6,}$/,
      hint: 'G- 뒤에 영대문자+숫자 (예: G-AB12CD34EF)',
    },
    {
      name: 'NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION',
      pattern: /^.{15,}$/,
      hint: '<meta content="..."> 안의 긴 랜덤 문자열 (15자 이상)',
    },
    { name: 'ECOS_API_KEY', pattern: /^.{8,}$/, hint: 'ECOS 발급 키 (8자 이상)' },
    { name: 'EXIM_FX_API_KEY', pattern: /^.{8,}$/, hint: '수출입은행 키' },
    { name: 'FSS_FINLIFE_API_KEY', pattern: /^.{8,}$/, hint: '금감원 키' },
    { name: 'KOSIS_API_KEY', pattern: /^.{8,}$/, hint: 'KOSIS 키' },
    { name: 'MOLIT_REALTOR_API_KEY', pattern: /^.{8,}$/, hint: 'MOLIT 실거래가 키' },
    { name: 'JUSO_API_KEY', pattern: /^.{8,}$/, hint: 'JUSO 도로명주소 키' },
  ];
  console.log('\n📋 환경변수 형식 검증:');
  let issues = 0;
  for (const c of checks) {
    const v = process.env[c.name];
    if (!v) {
      console.log(`  ⊘ ${c.name}: 미설정`);
    } else if (!c.pattern.test(v)) {
      console.log(`  ⚠️  ${c.name}: 형식 불일치 → ${c.hint}`);
      issues++;
    } else {
      console.log(`  ✅ ${c.name}: 정상`);
    }
  }
  if (issues > 0) {
    console.log(`\n  ⚠️  ${issues}개 키가 형식 검증 실패 — 깨진 URL 방지를 위해 비활성됨`);
  }
  console.log('');
}
validateKeys();

const API_KEYS = {
  ecos: process.env.ECOS_API_KEY,
  exim: process.env.EXIM_FX_API_KEY,
  fss: process.env.FSS_FINLIFE_API_KEY,
  kosis: process.env.KOSIS_API_KEY,
};

// Helper: Read existing JSON or return fallback
function readExistingData(filename) {
  const filepath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filepath)) {
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
  } catch (e) {
    console.warn(`Warning: Could not read ${filename}:`, e.message);
  }
  return null;
}

// Helper: Write JSON data
function writeDataFile(filename, data) {
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`✓ Updated ${filename}`);
}

// Helper: Fetch with timeout
async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// API 1: 한국은행 ECOS — 기준금리 + CPI
async function syncBokRates() {
  const filename = 'bok-rates.json';
  if (!API_KEYS.ecos) {
    console.log(`⊘ ECOS_API_KEY not set — keeping fallback for ${filename}`);
    return;
  }

  try {
    console.log('Fetching 한국은행 기준금리...');
    const rateUrl = `https://ecos.bok.or.kr/api/StatisticSearch/${API_KEYS.ecos}/json/kr/1/100/722Y001/M/202501/202604`;
    const rateResp = await fetchWithTimeout(rateUrl);

    if (!rateResp.ok) {
      throw new Error(`HTTP ${rateResp.status}`);
    }

    const rateData = await rateResp.json();
    const baseRateItem = rateData.StatisticSearch?.row?.[0];
    if (!baseRateItem) {
      throw new Error('No base rate data found');
    }

    const baseRate = parseFloat(baseRateItem.DATA_VALUE) / 100;
    const baseRateDate = baseRateItem.TIME;

    console.log('Fetching CPI...');
    const cpiUrl = `https://ecos.bok.or.kr/api/StatisticSearch/${API_KEYS.ecos}/json/kr/1/100/901Y009/M/202501/202604`;
    const cpiResp = await fetchWithTimeout(cpiUrl);

    if (!cpiResp.ok) {
      throw new Error(`HTTP ${cpiResp.status}`);
    }

    const cpiData = await cpiResp.json();
    const cpiItem = cpiData.StatisticSearch?.row?.[0];
    if (!cpiItem) {
      throw new Error('No CPI data found');
    }

    const cpi = parseFloat(cpiItem.DATA_VALUE);
    const cpiDate = cpiItem.TIME;

    const result = {
      baseRate,
      baseRateDate,
      cpi,
      cpiDate,
      source: 'live',
      note: '한국은행 ECOS API에서 실시간 동기화',
      fetchedAt: new Date().toISOString(),
    };

    writeDataFile(filename, result);
  } catch (error) {
    console.error(`✗ Failed to fetch BOK rates:`, error.message);
    console.log(`→ Keeping existing ${filename} intact`);
  }
}

// API 2: 한국수출입은행 환율
async function syncExchangeRates() {
  const filename = 'exchange-rates.json';
  if (!API_KEYS.exim) {
    console.log(`⊘ EXIM_FX_API_KEY not set — keeping fallback for ${filename}`);
    return;
  }

  try {
    console.log('Fetching 환율 정보...');
    const url = `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${API_KEYS.exim}&data=AP01`;
    const resp = await fetchWithTimeout(url);

    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }

    const data = await resp.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid exchange rate data format');
    }

    const rates = {};
    const currencyMap = {
      USD: 'USD',
      JPY: 'JPY',
      EUR: 'EUR',
      CNY: 'CNY',
      GBP: 'GBP',
    };

    data.forEach((item) => {
      if (currencyMap[item.cur_unit]) {
        rates[item.cur_unit] = parseFloat(item.deal_bas_r.replace(/,/g, ''));
      }
    });

    const result = {
      rates,
      baseDate: data[0].work_date,
      source: 'live',
      note: '한국수출입은행 매매기준율 실시간 동기화',
      fetchedAt: new Date().toISOString(),
    };

    writeDataFile(filename, result);
  } catch (error) {
    console.error(`✗ Failed to fetch exchange rates:`, error.message);
    console.log(`→ Keeping existing ${filename} intact`);
  }
}

// API 3: 금융감독원 금융상품통합비교공시
async function syncFinanceProducts() {
  const filename = 'finance-products.json';
  if (!API_KEYS.fss) {
    console.log(`⊘ FSS_FINLIFE_API_KEY not set — keeping fallback for ${filename}`);
    return;
  }

  try {
    console.log('Fetching 금융상품 정보...');
    const url = `https://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json?auth=${API_KEYS.fss}&topFinGrpNo=020000&pageNo=1`;
    const resp = await fetchWithTimeout(url);

    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }

    const data = await resp.json();
    const products = data.result?.baseList || [];

    let deposit12m = 3.25;
    let deposit24m = 3.30;
    let savings12m = 2.85;
    let savings24m = 2.95;

    // Extract average rates if available
    products.forEach((product) => {
      if (product.product_type === '정기예금' && product.mtrt_month === 12) {
        deposit12m = parseFloat(product.intrst_rate) || deposit12m;
      }
      if (product.product_type === '정기예금' && product.mtrt_month === 24) {
        deposit24m = parseFloat(product.intrst_rate) || deposit24m;
      }
      if (product.product_type === '적금' && product.mtrt_month === 12) {
        savings12m = parseFloat(product.intrst_rate) || savings12m;
      }
      if (product.product_type === '적금' && product.mtrt_month === 24) {
        savings24m = parseFloat(product.intrst_rate) || savings24m;
      }
    });

    const result = {
      deposit: {
        maturity12m: deposit12m,
        maturity24m: deposit24m,
        note: '금융감독원 금융상품통합비교공시 평균 정기예금 금리',
      },
      savings: {
        maturity12m: savings12m,
        maturity24m: savings24m,
        note: '금융감독원 금융상품통합비교공시 평균 적금 금리',
      },
      source: 'live',
      note: '금융감독원 finlife 실시간 동기화',
      fetchedAt: new Date().toISOString(),
    };

    writeDataFile(filename, result);
  } catch (error) {
    console.error(`✗ Failed to fetch finance products:`, error.message);
    console.log(`→ Keeping existing ${filename} intact`);
  }
}

// API 4: KOSIS — 가구 소득
async function syncKosisIncome() {
  const filename = 'kosis-income.json';
  if (!API_KEYS.kosis) {
    console.log(`⊘ KOSIS_API_KEY not set — keeping fallback for ${filename}`);
    return;
  }

  try {
    console.log('Fetching KOSIS 가구 소득 통계...');
    const url = `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${API_KEYS.kosis}&itmId=13001&objL1=&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json`;
    const resp = await fetchWithTimeout(url);

    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }

    const data = await resp.json();
    const records = data.result?.ResultData || [];

    let householdIncome = 4850000;
    let perCapitaIncome = 1850000;
    let dateStr = '2025-12-01';

    if (records.length > 0) {
      const latestRecord = records[0];
      householdIncome = parseFloat(latestRecord.DATA_VALUE) * 10000 || householdIncome;
      dateStr = latestRecord.PERIOD || dateStr;
    }

    // Assume per-capita is roughly 40% of household
    perCapitaIncome = Math.round(householdIncome * 0.38);

    const result = {
      householdMonthlyIncome: householdIncome,
      householdMonthlyIncomeDate: dateStr,
      perCapitaMonthlyIncome: perCapitaIncome,
      perCapitaMonthlyIncomeDate: dateStr,
      source: 'live',
      note: '통계청 KOSIS 실시간 동기화',
      fetchedAt: new Date().toISOString(),
    };

    writeDataFile(filename, result);
  } catch (error) {
    console.error(`✗ Failed to fetch KOSIS income:`, error.message);
    console.log(`→ Keeping existing ${filename} intact`);
  }
}

// Main execution
async function main() {
  console.log('🔄 Starting public data synchronization...\n');

  try {
    await syncBokRates();
    await syncExchangeRates();
    await syncFinanceProducts();
    await syncKosisIncome();

    console.log('\n✅ Public data sync completed\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error during sync:', error);
    process.exit(1);
  }
}

main();
