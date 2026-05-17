import type { Metadata } from 'next';
import ComingSoonTool from '@/components/ComingSoonTool';

export const metadata: Metadata = {
  title: 'Crop Image Online Free — Pixvert',
  description:
    'Crop images online for free. Select a region, set exact pixel coordinates, or use preset aspect ratios like 1:1, 16:9, 4:3. 100% private — files never leave your browser.',
  openGraph: {
    title: 'Crop Image Online Free — Pixvert',
    description:
      'Free online image cropper. Select region, set exact pixels, preset aspect ratios. No upload — 100% browser-based.',
    type: 'website',
  },
};

export default function CropPage() {
  return (
    <ComingSoonTool
      toolKey="crop"
      title="Crop Images Online — Free"
      subtitle="Select a region, set exact pixel coordinates, or choose a preset aspect ratio like 1:1 for Instagram or 16:9 for YouTube. 100% local — your files never leave your device."
      tags={['Visual crop tool', 'Preset ratios', 'Exact pixels', 'No upload']}
      benefits={[
        {
          icon: '✂️',
          title: 'Visual selection',
          description: 'Drag to select exactly the region you want. See a live preview before downloading.',
        },
        {
          icon: '📏',
          title: 'Preset aspect ratios',
          description: 'Instagram 1:1, YouTube 16:9, Twitter 4:1 header, LinkedIn cover — one click.',
        },
        {
          icon: '🎯',
          title: 'Pixel-perfect',
          description: 'Enter exact X, Y, width, and height coordinates for precise crops.',
        },
      ]}
    />
  );
}
