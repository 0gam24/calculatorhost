import GuideCategoryIndex, {
  buildGuideCategoryMetadata,
} from '@/components/guide/GuideCategoryIndex';

export const metadata = buildGuideCategoryMetadata('tax-real-estate');

export default function Page() {
  return <GuideCategoryIndex slug="tax-real-estate" />;
}
