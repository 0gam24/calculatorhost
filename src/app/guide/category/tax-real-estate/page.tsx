import GuideCategoryIndex, {
  buildGuideCategoryMetadata,
} from '@/components/guide/GuideCategoryIndex';
import { GuideCalculatorLink } from '@/components/guide/GuideCalculatorLink';

export const metadata = buildGuideCategoryMetadata('tax-real-estate');

export default function Page() {
  return (
    <GuideCategoryIndex
      slug="tax-real-estate"
      modifiedDate="2026-10-01"
      purposeNavigation={
        <section aria-labelledby="property-tax-purpose" className="card space-y-4">
          <h2 id="property-tax-purpose" className="text-xl font-semibold">지금 필요한 계산부터</h2>
          <p className="text-sm text-text-secondary">
            주택을 사거나 보유하거나 팔 때 필요한 계산기를 선택하세요. 주택 수·거래 유형 등 각
            계산기의 지원 조건을 확인한 뒤 입력하세요.
          </p>
          <ul className="grid gap-3 md:grid-cols-3">
            <li className="space-y-2">
              <p className="font-medium text-text-primary">집을 살 때</p>
              <GuideCalculatorLink source="tax-real-estate" target="acquisition-tax">
                주택 취득세 계산
              </GuideCalculatorLink>
              <p className="text-sm text-text-secondary">
                미리 확인: 취득가액·취득 후 세대 주택 수·주택 면적과 지역
              </p>
            </li>
            <li className="space-y-2">
              <p className="font-medium text-text-primary">보유 중일 때</p>
              <GuideCalculatorLink source="tax-real-estate" target="property-tax">
                주택 재산세 계산
              </GuideCalculatorLink>
              <p className="text-sm text-text-secondary">
                미리 확인: 주택 공시가격·1세대1주택 해당 여부·도시지역분 포함 여부
              </p>
            </li>
            <li className="space-y-2">
              <p className="font-medium text-text-primary">집을 팔 때</p>
              <GuideCalculatorLink source="tax-real-estate" target="capital-gains-tax">
                양도소득세 추정
              </GuideCalculatorLink>
              <p className="text-sm text-text-secondary">
                미리 확인: 양도가액·취득가액·필요경비·보유기간과 거주기간
              </p>
            </li>
          </ul>
          <p className="text-sm text-text-secondary">입력값은 자동으로 전달되지 않습니다.</p>
          <p className="text-caption text-text-tertiary">탐색 구성 업데이트: 2026-10-01</p>
        </section>
      }
    />
  );
}
