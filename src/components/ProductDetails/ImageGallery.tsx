import { FALLBACK_IMAGE_URL, getCleanImageUrl } from '../../utils/imageUtils';

interface Props {
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const ImageGallery = ({ images, selectedIndex, onSelect }: Props) => {
  const hasImages = images?.length > 0;

  return (
    <div>
      {/* Main Image */}
      <div className="aspect-4/3 overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={
            hasImages
              ? getCleanImageUrl([images[selectedIndex]])
              : FALLBACK_IMAGE_URL
          }
          alt="Product"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE_URL;
          }}
        />
      </div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={img}
              onClick={() => onSelect(idx)}
              className={`
                h-20 w-20 shrink-0 overflow-hidden rounded-xl border
                ${
                  selectedIndex === idx
                    ? 'border-slate-900'
                    : 'border-slate-200'
                }
              `}
            >
              <img
                src={getCleanImageUrl([img])}
                alt={`Thumbnail ${idx}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
