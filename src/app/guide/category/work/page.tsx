import GuideCategoryIndex, {
  buildGuideCategoryMetadata,
} from '@/components/guide/GuideCategoryIndex';

export const metadata = buildGuideCategoryMetadata('work');

export default function Page() {
  return <GuideCategoryIndex slug="work" />;
}
