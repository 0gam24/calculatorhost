import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: 'calculatorhost 문의 | 오류 제보 · 기능 제안 · 광고 문의',
  description: 'calculatorhost 계산 오류 제보, 계산기 기능 제안, 광고·파트너십 문의 등을 접수하는 공식 채널입니다. 빠른 응답을 보장합니다.',
  alternates: { canonical: 'https://calculatorhost.com/contact/' },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: '홈', url: 'https://calculatorhost.com/' },
  { name: '문의' },
]);

export default function ContactPage() {
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
          <div className="mx-auto max-w-2xl space-y-6">
            <Breadcrumb
              items={[
                { name: '홈', href: '/' },
                { name: '문의' },
              ]}
            />
            <h1 className="text-4xl font-bold">문의</h1>

            <div className="card space-y-4">
              <h2 className="text-xl font-semibold">이메일 문의</h2>
              <p className="text-text-secondary">
                계산 오류 제보, 새 계산기 제안, 광고/제휴 문의는 아래 이메일로 보내주세요.
              </p>
              <a
                href="mailto:smartdatashop@gmail.com"
                className="inline-block rounded-lg bg-primary-500 px-5 py-3 font-medium text-white hover:bg-primary-600"
              >
                smartdatashop@gmail.com
              </a>
              <p className="text-caption text-text-tertiary">평일 2~3일 내 답변드립니다.</p>
            </div>

            <div className="card space-y-3">
              <h2 className="text-xl font-semibold">문의 유형별 안내</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                <li>
                  <strong>계산 오류 제보</strong>: 해당 계산기 URL + 입력한 값 + 기대값을 함께
                  보내주시면 빠르게 확인하여 수정합니다.
                </li>
                <li>
                  <strong>기능 제안 / 새 계산기 요청</strong>: 어떤 상황에서 필요하신지 구체적으로
                  알려주시면 우선순위 평가에 반영합니다.
                </li>
                <li>
                  <strong>광고 / 제휴</strong>: 사이트명 · 운영자 정보 · 제안 내용을 포함해서
                  보내주시면 검토 후 답변드립니다.
                </li>
                <li>
                  <strong>개인정보 관련</strong>:{' '}
                  <a href="/privacy" className="text-primary-500">
                    개인정보처리방침
                  </a>
                  을 우선 확인 후 연락 주십시오.
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
