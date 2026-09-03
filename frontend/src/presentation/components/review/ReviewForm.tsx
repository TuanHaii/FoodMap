import React, { useState } from 'react';
import { RatingInput } from '../common/Rating/RatingInput';
import { Textarea } from '../common/Textarea/Textarea';
import { Button } from '../common/Button/Button';
import { CameraIcon, CloseIcon } from '../common/Icons';
import type { CreateReviewInput } from '../../../domain/review/types';
import './ReviewForm.css';

export interface ReviewFormProps {
  restaurantId: number;
  restaurantName: string;
  onSubmit: (input: CreateReviewInput) => Promise<void>;
  onCancel?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  restaurantId,
  restaurantName,
  onSubmit,
  onCancel,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [photos, setPhotos] = useState<{ id: number; url: string; file: File }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const newPhotos = files.slice(0, 5 - photos.length).map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (id: number) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) {
      setError('Vui lòng chọn số sao đánh giá');
      return;
    }
    if (comment.trim().length < 5) {
      setError('Nội dung nhận xét tối thiểu 5 ký tự');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit({
        restaurant_id: restaurantId,
        rating,
        comment: comment.trim(),
      });
      setComment('');
      setPhotos([]);
    } catch {
      setError('Không thể gửi đánh giá. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="review-form-container" onSubmit={handleSubmit}>
      <h3 className="review-form-title">Đánh giá quán {restaurantName}</h3>

      <RatingInput
        value={rating}
        onChange={(val) => {
          setRating(val);
          setError(null);
        }}
        required
      />

      <Textarea
        label="Nội dung trải nghiệm ẩm thực"
        placeholder="Chia sẻ cảm nhận của bạn về hương vị món ăn, không gian, thái độ phục vụ và giá cả..."
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          setError(null);
        }}
        required
        error={error || undefined}
        helperText="Tối thiểu 5 ký tự"
      />

      {/* Photo Uploader */}
      <div className="photo-upload-section">
        <label className="form-label">Hình ảnh thực tế (Tối đa 5 ảnh)</label>
        <div className="photo-upload-grid">
          {photos.map((p) => (
            <div key={p.id} className="photo-preview-item">
              <img src={p.url} alt="Review preview" className="photo-preview-img" />
              <button
                type="button"
                className="photo-remove-btn"
                onClick={() => removePhoto(p.id)}
                aria-label="Xóa ảnh"
              >
                <CloseIcon size={14} />
              </button>
            </div>
          ))}

          {photos.length < 5 && (
            <label className="photo-upload-btn">
              <CameraIcon size={24} color="var(--color-text-secondary)" />
              <span>Thêm ảnh</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={handlePhotoUpload}
              />
            </label>
          )}
        </div>
      </div>

      <div className="review-form-actions">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Hủy
          </Button>
        )}
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Đăng đánh giá
        </Button>
      </div>
    </form>
  );
};
