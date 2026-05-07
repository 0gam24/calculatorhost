import Link from 'next/link';
import { MainBackrefBox } from '@/components/network/MainBackrefBox';

export function Footer() {
  return (
    <footer className="border-t border-border-base bg-bg-base">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-2 font-semibold">calculatorhost</h3>
            <p className="text-sm text-text-secondary">
              한국 생활 금융·세금 계산기 31종을 2026년 최신 기준으로 제공하는 무료 서비스.
            </p>
            <p className="mt-3 text-caption text-text-tertiary">
              <Link href="/feed.xml" className="hover:text-primary-500">📡 RSS 피드 구독</Link>
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">인기 계산기</h3>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li><Link href="/calculator/salary" className="hover:text-primary-500">연봉 실수령액</Link></li>
              <li><Link href="/calculator/capital-gains-tax" className="hover:text-primary-500">양도소득세</Link></li>
              <li><Link href="/calculator/acquisition-tax" className="hover:text-primary-500">취득세</Link></li>
              <li><Link href="/calculator/loan-limit" className="hover:text-primary-500">대출한도(DSR/LTV)</Link></li>
              <li><Link href="/calculator/severance" className="hover:text-primary-500">퇴직금</Link></li>
              <li><Link href="/calculator/averaging-down" className="hover:text-primary-500">물타기 (주식·코인)</Link></li>
              <li><Link href="/calculator/vat" className="hover:text-primary-500">부가가치세(VAT)</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">가이드 & 사전</h3>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li><Link href="/guide/" className="hover:text-primary-500 font-semibold">📖 전체 가이드</Link></li>
              <li><Link href="/guide/tax-calendar-2026/" className="hover:text-primary-500 font-semibold text-primary-700 dark:text-primary-300">📅 2026 세금 캘린더</Link></li>
              <li><Link href="/guide/year-end-tax-settlement/" className="hover:text-primary-500">연말정산 (1~2월)</Link></li>
              <li><Link href="/guide/january-vehicle-tax-prepayment/" className="hover:text-primary-500">자동차세 연납 6.4%</Link></li>
              <li><Link href="/guide/may-comprehensive-income-tax/" className="hover:text-primary-500">🔥 5월 종합소득세 신고</Link></li>
              <li><Link href="/guide/june-property-tax/" className="hover:text-primary-500">🏠 재산세 (7월 납부)</Link></li>
              <li><Link href="/guide/dsr-loan-limit-tips/" className="hover:text-primary-500">DSR 한도 늘리는 5가지</Link></li>
              <li><Link href="/guide/capital-gains-tax-tips/" className="hover:text-primary-500">양도세 절세 7가지</Link></li>
              <li><Link href="/guide/dsr-regulation-zones/" className="hover:text-primary-500">DSR·LTV 규제지역 정리</Link></li>
              <li><Link href="/guide/freelancer-salary-comparison/" className="hover:text-primary-500">프리랜서 vs 일반직</Link></li>
              <li><Link href="/glossary/" className="hover:text-primary-500">용어사전 (28개)</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">정보</h3>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li><Link href="/about" className="hover:text-primary-500">소개</Link></li>
              <li><Link href="/updates/" className="hover:text-primary-500">📝 변경 이력 (Changelog)</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-500">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="hover:text-primary-500">이용약관</Link></li>
              <li><Link href="/affiliate-disclosure/" className="hover:text-primary-500">어필리에이트 공시</Link></li>
              <li><Link href="/contact" className="hover:text-primary-500">문의</Link></li>
              <li>
                <a href="mailto:smartdatashop@gmail.com" className="hover:text-primary-500">
                  smartdatashop@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* smartdatashop network — 메인 사이트 backref (NETWORK.md v0.6 dual-brand) */}
        <section aria-label="네트워크" className="mt-8">
          <h3 className="mb-2 text-sm font-semibold text-text-secondary">네트워크</h3>
          <MainBackrefBox variant="footer" />
        </section>

        <div className="mt-8 border-t border-border-subtle pt-6 text-caption text-text-tertiary">
          <p>
            본 사이트의 계산 결과는 참고용이며 법적 효력이 없습니다. 실제 금융·세무 처리는
            전문가의 안내를 받으시기 바랍니다.
          </p>
          <p className="mt-2">
            세율·공제·법조항은 운영자가 국세청·기재부·한국은행 등 1차 출처를 직접 확인하여
            반영합니다. 콘텐츠 작성에 AI 도구를 보조적으로 활용하며 모든 결과물은 운영자가
            최종 검토합니다.{' '}
            <Link href="/about" className="underline">콘텐츠 정책 및 운영 원칙 자세히 보기</Link>
          </p>
          <p className="mt-3 text-text-secondary">
            <strong>운영</strong>: 스마트데이터샵 (대표 김준혁) ·{' '}
            <span className="text-text-tertiary">사업자등록번호 406-06-34485</span>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} calculatorhost · 스마트데이터샵. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
