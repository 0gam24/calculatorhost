import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: 'calculatorhost 이용약관 | 무료 계산기 서비스 약관',
  description: 'calculatorhost 금융·세금·부동산 계산기 서비스 이용약관, 사용자 권리와 책임, 면책 조항, 콘텐츠 정책을 안내합니다. 서비스 이용 전 필독.',
  alternates: { canonical: 'https://calculatorhost.com/terms' },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: '홈', url: 'https://calculatorhost.com/' },
  { name: '이용약관' },
]);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <div className="flex">
        <Sidebar />
        <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-3xl space-y-6 text-text-secondary">
            <Breadcrumb
              items={[
                { name: '홈', href: '/' },
                { name: '이용약관' },
              ]}
            />
            <h1 className="text-4xl font-bold text-text-primary">이용약관</h1>
            <p className="text-caption text-text-tertiary">최종 업데이트: 2026-04-24</p>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">제1조 (목적)</h2>
              <p>
                본 약관은 calculatorhost(이하 "사이트")가 제공하는 계산기 및 관련 정보 서비스의
                이용 조건을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">제2조 (서비스 제공)</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>본 사이트는 무료로 제공됩니다.</li>
                <li>회원가입·로그인이 필요하지 않습니다.</li>
                <li>계산 결과는 브라우저 내에서만 처리되며 서버에 저장되지 않습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">제3조 (면책)</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  본 사이트의 계산 결과는 <strong>참고용</strong>이며 법적 효력을 가지지 않습니다.
                </li>
                <li>
                  세율·요율·법령 변경, 개별 특례 조건 등으로 실제 납부액/수령액과 차이가 발생할 수
                  있습니다.
                </li>
                <li>
                  본 사이트의 계산 결과를 근거로 한 모든 의사결정의 책임은 이용자 본인에게
                  있습니다.
                </li>
                <li>실제 세무·금융 처리 시 반드시 세무사·금융기관 등 전문가의 안내를 받으십시오.</li>
                <li>
                  본 사이트는 투자 권유, 특정 상품 추천, 수익 보장을 하지 않습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">제4조 (금지 행위)</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>서비스를 상업적으로 무단 복제·재배포하는 행위</li>
                <li>자동화된 수단으로 비정상적 트래픽을 발생시키는 행위</li>
                <li>게재된 광고를 고의로 부정 클릭하는 행위</li>
                <li>타인의 권리를 침해하거나 법령을 위반하는 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">제5조 (저작권)</h2>
              <p>
                본 사이트의 디자인·구성·계산 공식의 구현체는 calculatorhost 에 저작권이 있으며
                무단 복제를 금합니다. 다만 세율 등 공공정보는 저작권 대상이 아닙니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">제6조 (광고)</h2>
              <p>
                본 사이트는 Google AdSense 를 통한 광고 수익으로 운영됩니다. 광고 내용은 Google
                정책과 이용자의 관심사에 따라 자동 노출되며, calculatorhost 는 광고 내용·상품의
                정확성·안전성에 대해 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-text-primary">제7조 (변경)</h2>
              <p>
                본 약관은 관련 법령 또는 서비스 변경에 따라 개정될 수 있으며, 개정 시 본 페이지에
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
