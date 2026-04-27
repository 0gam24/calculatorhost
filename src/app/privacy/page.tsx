import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: 'calculatorhost 개인정보처리방침 | 정책 및 쿠키 안내',
  description: 'calculatorhost의 개인정보 수집·이용·보관·제3자 제공(Google AdSense, Analytics) 사항을 투명하게 공개합니다. GDPR 준수.',
  alternates: { canonical: 'https://calculatorhost.com/privacy' },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: '홈', url: 'https://calculatorhost.com/' },
  { name: '개인정보처리방침' },
]);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-3xl space-y-6 text-text-secondary">
            <Breadcrumb
              items={[
                { name: '홈', href: '/' },
                { name: '개인정보처리방침' },
              ]}
            />
            <h1 className="text-4xl font-bold text-text-primary">개인정보처리방침</h1>
            <p className="text-caption text-text-tertiary">최종 업데이트: 2026-04-24</p>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">1. 수집하는 개인정보</h2>
              <p>
                calculatorhost (이하 "사이트") 는 원칙적으로 회원가입 및 로그인 기능을 제공하지 않으며,
                계산기 이용을 위해 입력한 연봉·금액·세율 등의 수치는 서버에 전송·저장되지 않고 오직
                이용자 브라우저 내에서만 처리됩니다.
              </p>
              <p className="mt-2">자동 수집되는 항목은 다음과 같습니다:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>IP 주소, 브라우저 종류 및 OS (웹서버 로그)</li>
                <li>방문 일시, 방문 경로 (Google Analytics)</li>
                <li>쿠키 기반 광고 식별자 (Google AdSense)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">2. 쿠키 및 제3자 서비스</h2>
              <p>본 사이트는 다음 제3자 서비스를 이용합니다:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <strong>Google AdSense</strong>: 광고 게재를 위해 쿠키를 사용하며, 이전 방문 기록에
                  기반한 관심사 맞춤 광고를 제공할 수 있습니다. Google 의 광고 쿠키 사용과 관련된 정책은{' '}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-500"
                  >
                    Google 광고 정책
                  </a>
                  에서 확인하실 수 있습니다. 사용자는{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-500"
                  >
                    광고 설정 페이지
                  </a>
                  에서 맞춤 광고를 거부할 수 있습니다.
                </li>
                <li>
                  <strong>Google Analytics 4</strong>: 방문 행태 분석을 위해 익명 식별자(client ID)
                  쿠키를 사용합니다. IP 는 익명화되어 수집됩니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">3. 이용자 선택권</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  브라우저 설정에서 쿠키를 거부 또는 삭제할 수 있습니다. 단, 이 경우 광고는 맞춤형이
                  아닌 일반 광고로 표시됩니다.
                </li>
                <li>
                  EEA/영국/캘리포니아 사용자는 초기 방문 시 동의 배너 (Google Funding Choices 기반)
                  를 통해 맞춤 광고 수신 여부를 선택할 수 있습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">4. 보관 기간</h2>
              <p>
                서버 액세스 로그는 30일간 보관 후 자동 삭제됩니다. Google Analytics 수집 데이터의
                보관 기간은 Google 정책에 따릅니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">5. 개인정보 보호 책임자</h2>
              <p>
                개인정보 관련 문의는 <a href="/contact" className="text-primary-500">문의 페이지</a>를
                이용해 주시기 바랍니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">6. 변경 사항</h2>
              <p>
                본 방침은 관련 법령 또는 서비스 변경에 따라 개정될 수 있습니다. 개정 시 본 페이지에
                사전 공지합니다.
              </p>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
