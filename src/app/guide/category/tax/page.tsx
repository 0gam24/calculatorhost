import GuideCategoryIndex, {
  buildGuideCategoryMetadata,
} from '@/components/guide/GuideCategoryIndex';

export const metadata = buildGuideCategoryMetadata('tax');

export default function Page() {
  return <GuideCategoryIndex slug="tax" />;
}
