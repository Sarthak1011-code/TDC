import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image?: string;
  quote: string;
  rating?: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Web Developer",
    quote: "TIT Dev Community transformed my coding journey! The mentorship program helped me land my first internship. The seniors are always ready to help and guide us.",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "ML Enthusiast",
    quote: "Best decision ever to join this community! The workshops are hands-on and practical. I learned more here in 3 months than I did in a year of self-study.",
    rating: 5
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "App Developer",
    quote: "The hackathons and coding competitions pushed me out of my comfort zone. I've grown so much as a developer thanks to TIT Dev Community!",
    rating: 5
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Full Stack Developer",
    quote: "From zero to hero! The community's support system is incredible. Whether it's debugging at midnight or career advice, someone's always there.",
    rating: 5
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Competitive Programmer",
    quote: "The peer learning environment here is unmatched. Collaborating on projects with talented peers has been an amazing experience!",
    rating: 5
  }
];

export const TestimonialCarousel = () => {
  return (
    <div className="w-full py-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="testimonial-swiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="!w-[90%] md:!w-[600px]">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 shadow-xl h-full">
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-12 h-12 text-purple-400 opacity-50" />
              </div>

              {/* Quote Text */}
              <p className="text-gray-200 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Rating Stars */}
              {testimonial.rating && (
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
              )}

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-purple-300 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .testimonial-swiper {
          padding: 40px 20px 60px;
        }
        
        .testimonial-swiper .swiper-pagination-bullet {
          background: #a855f7;
          opacity: 0.5;
        }
        
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(to right, #a855f7, #ec4899);
        }
        
        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          color: #a855f7;
        }
        
        .testimonial-swiper .swiper-button-next:hover,
        .testimonial-swiper .swiper-button-prev:hover {
          color: #ec4899;
        }
      `}</style>
    </div>
  );
};

