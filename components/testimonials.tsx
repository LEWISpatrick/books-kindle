'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AvatarCircles from '@/components/ui/user-avatar-card'

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Patrick ',
      avatar: '/testimonials/default.jpeg',
      message: 'After using the Books Kindle premium package, I\'m blown away by the quality and selection of books and audiobooks. It\'s a fantastic product that I highly recommend to all book lovers.'
    },
    {
      name: 'Sarah Lewis',
      avatar: '/testimonials/default.jpeg',
      message: 'I\'ve been using the Books Kindle premium package for a few months now, and it\'s been a game-changer. The ability to switch between reading and listening to audiobooks is fantastic. Highly recommended!'
    },
    {
      name: 'Emily',
      avatar: '/testimonials/default.jpeg',
      message: 'I love the variety of books available on the Books Kindle premium package. Whether I\'m in the mood for a thriller, romance, or non-fiction, there\'s always something that catches my eye.'
    },
    {
      name: 'Caroline Santa',
      avatar: '/testimonials/woman.jpeg',
      message: 'As an avid reader, I can\'t recommend the Books Kindle premium package enough. It\'s convenient, affordable, and has introduced me to some amazing reads.'
    },
    {
      name: 'Melissa Smith',
      avatar: '/testimonials/default.jpeg',
      message: 'The Books Kindle premium package has transformed my reading experience. With access to a vast library of books and audiobooks, I can always find something new and exciting to dive into.'
    },
    {
      name: 'Misto Rita',
      avatar: '/testimonials/woman_3.jpeg',
      message: 'I\'ve tried other similar services, but none compare to the Books Kindle premium package. The selection is unbeatable, and the reading experience is seamless.'
    },
    {
      name: 'Lewis p. ',
      avatar: '/testimonials/white.jpeg',
      message: 'The Books Kindle premium package has reignited my love for reading. With such a diverse range of titles available, I\'m constantly discovering new authors and genres.'
    },
    {
      name: 'Sarah Carter',
      avatar: '/testimonials/default.jpeg',
      message: 'I\'ve always been a fan of physical books, but the Books Kindle premium package has converted me. The convenience of having so many books at my fingertips is unbeatable.'
    },
    {
      name: 'Emily Doe',
      avatar: '/testimonials/default.jpeg',
      message: 'I love the variety of books available on the Books Kindle premium package. Whether I\'m in the mood for a thriller, romance, or non-fiction, there\'s always something that catches my eye.'
    },
 
    
  ];

  return (
    <div>
      {/* Section Title */}
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="pb-4 text-4xl font-extrabold text-foreground">
          Testimonials
        </h2>
        <p className="text-md opacity-50 max-w-lg text-center">
        Here's what People have to say about us.
        </p>
        <AvatarCircles />
      </div>
      {/* Testimonials Card*/}
      <div className="flex items-center justify-center my-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {testimonials.map((testimonial, i) => (
            <Card
              key={i}
              className="py-4 px-0 bg-secondary border-0 ring-[2px] ring-foreground/10 ring-inset rounded-lg hover:bg-primary/10 hover:ring-primary/25 transition duration-300 cursor-default"
            >
              <CardContent className="py-0">
                <div className="flex">
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                  </Avatar>

                  <CardTitle className="text-lg pl-2 text-foreground pt-1">
                    {testimonial.name}
                  </CardTitle>
                </div>
                <p className="pt-3 text-foreground/70">
                  "{testimonial.message}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
