import GuideCategoryIndex, {
  buildGuideCategoryMetadata,
} from '@/components/guide/GuideCategoryIndex';

export const metadata = buildGuideCategoryMetadata('finance');

export default function Page() {
  return <GuideCategoryIndex slug="finance" />;
}
