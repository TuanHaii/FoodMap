import type { Category, Restaurant } from '../domain/restaurant/types';
import type { Review } from '../domain/review/types';
import type { SubscriptionPlan, BusinessDashboardStats, BusinessInvoice } from '../domain/subscription/types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Tất cả', slug: 'all', icon: '🍽️', restaurant_count: 48 },
  { id: 2, name: 'Cơm tấm Long Xuyên', slug: 'com-tam', icon: '🍚', restaurant_count: 14 },
  { id: 3, name: 'Bún cá An Giang', slug: 'bun-ca', icon: '🍜', restaurant_count: 10 },
  { id: 4, name: 'Lẩu mắm & Đặc sản', slug: 'lau-mam', icon: '🍲', restaurant_count: 8 },
  { id: 5, name: 'Bánh xèo & Bánh cống', slug: 'banh-xeo', icon: '🥞', restaurant_count: 6 },
  { id: 6, name: 'Cà phê & Trà sữa', slug: 'ca-phe', icon: '☕', restaurant_count: 18 },
  { id: 7, name: 'Ăn vặt & Chợ đêm', slug: 'an-vat', icon: '🍢', restaurant_count: 12 },
  { id: 8, name: 'Quán nhậu & Hải sản', slug: 'hai-san', icon: '🦐', restaurant_count: 9 },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: 'Cơm Tấm Cây Điệp Long Xuyên',
    slug: 'com-tam-cay-diep-long-xuyen',
    address: '67 Lý Tự Trọng, Phường Mỹ Long, TP. Long Xuyên, An Giang',
    ward: 'Mỹ Long',
    phone: '0296 3841 241',
    price_range: '35.000đ - 65.000đ',
    description: 'Quán cơm tấm nhuyễn truyền thống nổi tiếng bậc nhất Long Xuyên với thịt nướng mật ong thơm lừng, bì mềm, chả trứng béo ngậy và nước mắm kẹo đậm đà.',
    latitude: 10.3789,
    longitude: 105.4378,
    avg_rating: 4.8,
    review_count: 328,
    is_verified: true,
    is_sponsored: true,
    sponsored_label: 'Được tài trợ',
    checkin_count: 1420,
    favorite_count: 512,
    categories: [
      { id: 2, name: 'Cơm tấm Long Xuyên', slug: 'com-tam' }
    ],
    media: [
      { id: 101, url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', caption: 'Dĩa cơm tấm sườn bì chả đặc biệt nhuyễn' },
      { id: 102, url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', caption: 'Không gian quán lúc nào cũng tấp nập' },
      { id: 103, url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', caption: 'Sườn nướng xém cạnh thơm phức' }
    ],
    opening_hours: {
      open: '06:00',
      close: '21:00',
      days: 'Thứ 2 - Chủ Nhật',
      is_open_now: true
    },
    dishes: [
      { id: 1, restaurant_id: 1, name: 'Cơm tấm sườn nướng đặc biệt', price: 45000, description: 'Sườn ướp mật ong nướng than hoa, cơm tấm nhuyễn, mỡ hành', is_signature: true },
      { id: 2, restaurant_id: 1, name: 'Cơm tấm bì chả trứng kho', price: 40000, description: 'Bì sợi giòn dai, chả hấp mềm thơm kèm trứng kho đậm đà' },
      { id: 3, restaurant_id: 1, name: 'Canh khổ qua dồn thịt', price: 15000, description: 'Canh thanh mát giải ngấy ngọt nước hầm xương' },
      { id: 4, restaurant_id: 1, name: 'Trà đá lá dứa thơm', price: 3000, description: 'Trà đá đậm vị thanh nhiệt' }
    ]
  },
  {
    id: 2,
    name: 'Bún Cá Long Xuyên Bé Hai',
    slug: 'bun-ca-long-xuyen-be-hai',
    address: '105 Chi Lăng, Phường Mỹ Hoa, TP. Long Xuyên, An Giang',
    ward: 'Mỹ Hoa',
    phone: '0918 234 567',
    price_range: '30.000đ - 45.000đ',
    description: 'Bún cá nghệ vàng óng nước dùng nấu từ cá lóc đồng tươi sống rỉa xương giòn ngọt, ăn kèm rau nhút, bắp chuối và bông điên điển mùa nước nổi.',
    latitude: 10.3842,
    longitude: 105.4291,
    avg_rating: 4.7,
    review_count: 194,
    is_verified: true,
    is_sponsored: false,
    checkin_count: 860,
    favorite_count: 340,
    categories: [
      { id: 3, name: 'Bún cá An Giang', slug: 'bun-ca' }
    ],
    media: [
      { id: 104, url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80', caption: 'Tô bún cá lóc đồng bông điên điển' },
      { id: 105, url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', caption: 'Rau ghém miền Tây tươi roi rói' }
    ],
    opening_hours: {
      open: '06:00',
      close: '13:30',
      days: 'Thứ 2 - Chủ Nhật',
      is_open_now: true
    },
    dishes: [
      { id: 5, restaurant_id: 2, name: 'Tô bún cá lóc đồng đầy đủ', price: 35000, description: 'Cá lóc xào nghệ, chả cá chiên, đầu cá béo ngậy', is_signature: true },
      { id: 6, restaurant_id: 2, name: 'Đầu cá lóc hấp nghệ gừng', price: 25000, description: 'Đầu cá tươi ngọt ăn kèm mắm me cay nồng' }
    ]
  },
  {
    id: 3,
    name: 'Lẩu Mắm Cây Dừa An Giang',
    slug: 'lau-mam-cay-dua-an-giang',
    address: '95 Trần Hưng Đạo, Phường Mỹ Bình, TP. Long Xuyên, An Giang',
    ward: 'Mỹ Bình',
    phone: '0296 3955 888',
    price_range: '150.000đ - 350.000đ',
    description: 'Nồi lẩu mắm cá linh, cá sặc đậm đà hương vị miền Tây, ngập tràn hải sản cá hú, tôm sông, mực tươi và đĩa rau đồng hơn 15 loại rau quê.',
    latitude: 10.3725,
    longitude: 105.4412,
    avg_rating: 4.6,
    review_count: 240,
    is_verified: true,
    is_sponsored: true,
    sponsored_label: 'Được tài trợ',
    checkin_count: 1105,
    favorite_count: 420,
    categories: [
      { id: 4, name: 'Lẩu mắm & Đặc sản', slug: 'lau-mam' }
    ],
    media: [
      { id: 106, url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80', caption: 'Lẩu mắm sôi sùng sục thơm nức mũi' },
      { id: 107, url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', caption: 'Đĩa rau đồng ăn kèm lẩu' }
    ],
    opening_hours: {
      open: '10:00',
      close: '22:00',
      days: 'Thứ 2 - Chủ Nhật',
      is_open_now: true
    },
    dishes: [
      { id: 7, restaurant_id: 3, name: 'Lẩu mắm đặc biệt 4 người', price: 280000, description: 'Cá linh, tôm, mực, cà tím, đĩa rau đồng 15 loại', is_signature: true },
      { id: 8, restaurant_id: 3, name: 'Cá lóc nướng trui cuốn bánh tráng', price: 160000, description: 'Nướng rơm chuẩn vị quê, chấm mắm nêm chua ngọt' }
    ]
  },
  {
    id: 4,
    name: 'Bánh Xèo Rau Rừng Thoại Sơn Quán',
    slug: 'banh-xeo-rau-rung-thoai-son-quan',
    address: '42 Lê Triệu Kiết, Phường Mỹ Xuyên, TP. Long Xuyên, An Giang',
    ward: 'Mỹ Xuyên',
    phone: '0907 891 011',
    price_range: '30.000đ - 60.000đ',
    description: 'Vỏ bánh mỏng giòn rụm màu nghệ vàng, nhân tôm đất nhảy tanh tách, thịt ba chỉ béo thơm, cuốn cùng 20 loại lá rau rừng Núi Cấm tươi xanh.',
    latitude: 10.3698,
    longitude: 105.4345,
    avg_rating: 4.5,
    review_count: 142,
    is_verified: false,
    is_sponsored: false,
    checkin_count: 530,
    favorite_count: 210,
    categories: [
      { id: 5, name: 'Bánh xèo & Bánh cống', slug: 'banh-xeo' }
    ],
    media: [
      { id: 108, url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', caption: 'Bánh xèo vàng giòn kèm rổ rau rừng Núi Cấm' }
    ],
    opening_hours: {
      open: '14:00',
      close: '21:30',
      days: 'Thứ 2 - Chủ Nhật',
      is_open_now: true
    },
    dishes: [
      { id: 9, restaurant_id: 4, name: 'Bánh xèo tôm nhảy thịt củ hũ dừa', price: 35000, description: 'Bánh to giòn thơm, nhân củ hũ dừa giòn ngọt', is_signature: true },
      { id: 10, restaurant_id: 4, name: 'Bánh cống Sóc Trăng giòn thơm', price: 15000, description: 'Nhân đậu xanh thịt bằm tôm nguyên con' }
    ]
  },
  {
    id: 5,
    name: 'Cà Phê Vợt Hai Củi Long Xuyên',
    slug: 'ca-phe-vot-hai-cui-long-xuyen',
    address: '18 Hai Bà Trưng, Phường Mỹ Long, TP. Long Xuyên, An Giang',
    ward: 'Mỹ Long',
    phone: '0296 3855 123',
    price_range: '15.000đ - 35.000đ',
    description: 'Quán cà phê vợt đun củi giữ lửa hơn 40 năm bên dòng sông Hậu. Nơi giao lưu trò chuyện thân tình của người dân Long Xuyên mỗi sớm mai.',
    latitude: 10.3812,
    longitude: 105.4429,
    avg_rating: 4.9,
    review_count: 410,
    is_verified: true,
    is_sponsored: false,
    checkin_count: 2300,
    favorite_count: 780,
    categories: [
      { id: 6, name: 'Cà phê & Trà sữa', slug: 'ca-phe' }
    ],
    media: [
      { id: 109, url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80', caption: 'Ly bạc xỉu nóng hổi hương thơm đượm nồng' },
      { id: 110, url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', caption: 'Ấm đun củi truyền thống' }
    ],
    opening_hours: {
      open: '05:00',
      close: '18:00',
      days: 'Thứ 2 - Chủ Nhật',
      is_open_now: true
    },
    dishes: [
      { id: 11, restaurant_id: 5, name: 'Cà phê sữa đá vợt đun củi', price: 18000, description: 'Cà phê đậm đà thơm béo vị sữa đặc Ông Thọ', is_signature: true },
      { id: 12, restaurant_id: 5, name: 'Bạc xỉu nóng chấm bánh tiêu', price: 22000, description: 'Vị béo ngậy ngọt nhẹ buổi sớm' }
    ]
  },
  {
    id: 6,
    name: 'Gỏi Đu Đủ Bò Vàng Thất Sơn',
    slug: 'goi-du-du-bo-vang-that-son',
    address: '88 Ung Văn Khiêm, Phường Mỹ Phước, TP. Long Xuyên, An Giang',
    ward: 'Mỹ Phước',
    phone: '0939 123 456',
    price_range: '25.000đ - 50.000đ',
    description: 'Món ăn vặt trứ danh sinh viên Đại học An Giang với sợi đu đủ bào giòn sần sật, khô bò đen tẩm ướp cay tê tái, đậu phộng rang giòn thơm phức.',
    latitude: 10.3654,
    longitude: 105.4211,
    avg_rating: 4.6,
    review_count: 188,
    is_verified: false,
    is_sponsored: false,
    checkin_count: 670,
    favorite_count: 290,
    categories: [
      { id: 7, name: 'Ăn vặt & Chợ đêm', slug: 'an-vat' }
    ],
    media: [
      { id: 111, url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', caption: 'Dĩa gỏi đu đủ khô bò cay xuýt xoa' }
    ],
    opening_hours: {
      open: '15:00',
      close: '22:30',
      days: 'Thứ 2 - Chủ Nhật',
      is_open_now: true
    },
    dishes: [
      { id: 13, restaurant_id: 6, name: 'Gỏi đu đủ bò vàng đặc biệt', price: 30000, description: 'Đu đủ giòn, khô bò đượm vị, nước sốt me chua cay', is_signature: true },
      { id: 14, restaurant_id: 6, name: 'Trà tắc xí muội khổng lồ', price: 15000, description: 'Chua ngọt thanh mát đã khát' }
    ]
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    restaurant_id: 1,
    restaurant_name: 'Cơm Tấm Cây Điệp Long Xuyên',
    user: {
      id: 201,
      name: 'Nguyễn Văn Hùng',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    },
    rating: 5,
    comment: 'Cơm tấm ở đây đúng chất Long Xuyên hạt nhuyễn li ti, thịt ướp thơm lừng vừa miệng, chén mắm kẹo sệt ăn với sườn thì không còn gì bằng! Quán đông nhưng phục vụ rất nhanh nhẹn.',
    created_at: '2026-08-28T09:30:00Z',
    media: [
      { id: 301, url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', caption: 'Dĩa cơm đầy ụ' }
    ],
    reply: {
      id: 1,
      user_id: 1,
      user_name: 'Chủ quán Cây Điệp',
      comment: 'Cảm ơn anh Hùng đã ghé ủng hộ quán! Hân hạnh được phục vụ quý khách lần tới ạ!',
      created_at: '2026-08-28T14:15:00Z'
    }
  },
  {
    id: 2,
    restaurant_id: 1,
    restaurant_name: 'Cơm Tấm Cây Điệp Long Xuyên',
    user: {
      id: 202,
      name: 'Trần Thị Mai Phương',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    rating: 5,
    comment: 'Mỗi lần về An Giang là nhất định phải ghé Cây Điệp ăn cơm tấm sườn chả. Hương vị mấy chục năm vẫn không đổi, giá cả rất phải chăng.',
    created_at: '2026-08-20T12:00:00Z'
  },
  {
    id: 3,
    restaurant_id: 2,
    restaurant_name: 'Bún Cá Long Xuyên Bé Hai',
    user: {
      id: 203,
      name: 'Lê Hoàng Nam',
      avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80'
    },
    rating: 5,
    comment: 'Nước lèo thanh ngọt tự nhiên của cá lóc đồng, không hề tanh một chút nào. Đĩa rau nhút và bông điên điển tươi non ăn rất bắt vị.',
    created_at: '2026-08-15T08:10:00Z'
  }
];

export const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_basic',
    name: 'Gói Cơ Bản (Khởi Đầu)',
    price_monthly: 0,
    price_yearly: 0,
    features: [
      'Xác thực quyền sở hữu quán (Verified)',
      'Cập nhật thông tin quán & giờ mở cửa',
      'Đăng tải thực đơn & giá món ăn',
      'Phản hồi đánh giá của thực khách',
      'Thống kê lượt xem cơ bản'
    ]
  },
  {
    id: 'plan_pro',
    name: 'Gói Nổi Bật (Pro Growth)',
    price_monthly: 299000,
    price_yearly: 2990000,
    badge: 'Phổ biến nhất',
    is_popular: true,
    features: [
      'Tất cả tính năng Gói Cơ Bản',
      'Huy hiệu Được Tài Trợ (Sponsored) minh bạch',
      'Ưu tiên hiển thị tại trang chủ & đầu danh mục',
      'Ghim 3 món ăn Signature đặc sắc nhất',
      'Thống kê chi tiết khách hàng & lượt tìm kiếm',
      'Hỗ trợ kỹ thuật ưu tiên 24/7'
    ]
  },
  {
    id: 'plan_premium',
    name: 'Gói Chuỗi Quán (Brand Partner)',
    price_monthly: 699000,
    price_yearly: 6990000,
    badge: 'Dành cho thương hiệu lớn',
    features: [
      'Tất cả tính năng Gói Pro',
      'Quản lý không giới hạn chi nhánh',
      'Vị trí Banner độc quyền trang khám phá',
      'Tạo chiến dịch khuyến mãi & Voucher',
      'Báo cáo phân tích đối thủ cạnh tranh',
      'Chuyên viên tư vấn truyền thông riêng'
    ]
  }
];

export const MOCK_DASHBOARD_STATS: BusinessDashboardStats = {
  views_this_month: 12450,
  views_growth_percent: 18.5,
  total_reviews: 328,
  new_reviews_this_week: 14,
  avg_rating: 4.8,
  checkins_count: 1420,
  favorites_count: 512
};

export const MOCK_INVOICES: BusinessInvoice[] = [
  {
    id: 'INV-2026-001',
    date: '01/08/2026',
    plan_name: 'Gói Nổi Bật (Pro Growth)',
    amount: 299000,
    status: 'PAID',
    pdf_url: '#'
  },
  {
    id: 'INV-2026-002',
    date: '01/07/2026',
    plan_name: 'Gói Nổi Bật (Pro Growth)',
    amount: 299000,
    status: 'PAID',
    pdf_url: '#'
  },
  {
    id: 'INV-2026-003',
    date: '01/06/2026',
    plan_name: 'Gói Nổi Bật (Pro Growth)',
    amount: 299000,
    status: 'PAID',
    pdf_url: '#'
  }
];
