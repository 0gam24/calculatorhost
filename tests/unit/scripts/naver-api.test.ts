// naver-api.mjs / eye-offset.mjs unit tests.
// 인증 방식 선택과 엔드포인트, 운영자 눈 확인 값 해석.
import { describe, expect, it } from 'vitest';
import { authFor, endpointFor } from '../../../scripts/lib/naver-api.mjs';
import { eyeFor, parseEyeValue } from '../../../scripts/lib/eye-offset.mjs';

describe('authFor', () => {
  it('API HUB 키가 있으면 HUB 헤더', () => {
    const a = authFor({ NCP_API_KEY_ID: 'id', NCP_API_KEY: 'key', NAVER_CLIENT_ID: 'x', NAVER_CLIENT_SECRET: 'y' });
    expect(a.mode).toBe('hub');
    expect(a.headers).toEqual({ 'X-NCP-APIGW-API-KEY-ID': 'id', 'X-NCP-APIGW-API-KEY': 'key' });
  });
  it('HUB 키가 없으면 개발자센터 키로 대체', () => {
    const a = authFor({ NAVER_CLIENT_ID: 'x', NAVER_CLIENT_SECRET: 'y' });
    expect(a.mode).toBe('legacy');
    expect(a.headers).toEqual({ 'X-Naver-Client-Id': 'x', 'X-Naver-Client-Secret': 'y' });
  });
  it('둘 다 없으면 null', () => {
    expect(authFor({}).mode).toBeNull();
  });
  it('반쪽 키는 없는 것으로 본다', () => {
    expect(authFor({ NCP_API_KEY_ID: 'id' }).mode).toBeNull();
  });
});

describe('endpointFor', () => {
  it('HUB 도메인', () => {
    expect(endpointFor('hub', 'webkr')).toBe('https://naverapihub.apigw.ntruss.com/search/v1/webkr');
    expect(endpointFor('hub', 'trend')).toBe('https://naverapihub.apigw.ntruss.com/search-trend/v1/search');
  });
  it('레거시 도메인', () => {
    expect(endpointFor('legacy', 'blog')).toBe('https://openapi.naver.com/v1/search/blog.json');
    expect(endpointFor('legacy', 'trend')).toBe('https://openapi.naver.com/v1/datalab/search');
  });
  it('모르는 이름은 오류', () => {
    expect(() => endpointFor('hub', 'nope')).toThrow();
  });
});

describe('parseEyeValue', () => {
  it('라벨과 숫자를 1|2|3 으로', () => {
    expect(parseEyeValue('첫 화면')).toBe(1);
    expect(parseEyeValue('한 번 스크롤')).toBe(2);
    expect(parseEyeValue('그 아래')).toBe(3);
    expect(parseEyeValue('3')).toBe(3);
    expect(parseEyeValue('모름')).toBeNull();
  });
});

describe('eyeFor', () => {
  const store = { byQuery: { '청약가점 계산기': { value: 1, date: '2026-10-07' } } };
  it('공백을 무시하고 찾는다', () => {
    expect(eyeFor(store, '청약가점계산기', '2026-10-08')).toBe(1);
  });
  it('7일이 지나면 무시', () => {
    expect(eyeFor(store, '청약가점 계산기', '2026-10-15')).toBeNull();
  });
});
