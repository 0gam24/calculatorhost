import GuideCategoryIndex, {
  buildGuideCategoryMetadata,
} from '@/components/guide/GuideCategoryIndex';

export const metadata = buildGuideCategoryMetadata('investment');

export default function Page() {
  return <GuideCategoryIndex slug="investment" />;
}
