import Image from 'next/image';
import { Earth, Heart, Sun } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Joyce</h1>
            <p className="text-xl max-w-3xl mx-auto">
              A creative soul exploring the world through the process of making
              art.
            </p>
          </div>
        </div>
      </section>

      {/* Artist Story */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">My Journey</h2>
              <p className="text-lg mb-6">
                I have been passionate about drawing since childhood, finding
                creativity to be my natural language of expression. I earned a
                B.S. in Studio Art and a B.F.A. in Art Education from Miami
                University, where I deepened my love for using art as both a way
                to understand the world and to share my perspective with others.
              </p>
              <p className="text-lg mb-6">
                Inspired by the beauty of everyday life, I often draw from the
                colors, shapes, and spatial relationships I observe in outdoor
                scenery. Each piece I create is a reflection of my experiences,
                emotions, and the world around me.
              </p>
              <p className="text-lg">
                When I&apos;m not creating, I enjoy time at home with my
                husband, our two young children and a lively household of four
                cats. I believe that art has the power to transform spaces and
                touch hearts, and I&apos;m honored to share my work with
                collectors who appreciate the beauty and meaning behind each
                brushstroke.
              </p>
            </div>
            <div className="aspect-square bg-card rounded-lg overflow-hidden shadow-xl bg-peach w-80 h-80 mx-auto">
              <Image
                src="/images/me.png"
                alt="Joyce in her studio"
                width={320}
                height={320}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Inspires Me</h2>
            <p className="text-xl max-w-2xl mx-auto">
              My work draws inspiration from the natural world, architecture,
              and story-telling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4">
                <Earth className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Nature</h3>
              <p>
                The ever-changing landscapes, seasons, and natural phenomena
                provide endless inspiration for color palettes, textures, and
                compositions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Emotion</h3>
              <p>
                Human emotions, relationships, and the complexity of the human
                experience drive me to create pieces that resonate on a deeply
                personal level.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Light & Shadow</h3>
              <p>
                The dramatic interplay of light and shadow creates depth, mood,
                and visual interest that I love to capture in my work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=450&fit=crop"
                  alt="Joyce's studio"
                  width={600}
                  height={450}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                My Studio
              </h2>
              <p className="text-lg mb-6">
                Located in the heart of the art community, my studio is a space
                where creativity knows no bounds. Natural light floods through
                large windows, creating the perfect environment for painting and
                drawing.
              </p>
              <p className="text-lg mb-6">
                Every corner of the studio is filled with inspiration - from my
                collection of art books and reference materials to the carefully
                organized palette of paints and brushes that I use to bring my
                visions to life.
              </p>
              <p className="text-lg">
                I welcome visitors by appointment, as I believe that seeing the
                creative process firsthand helps collectors connect more deeply
                with the artwork they choose to bring into their homes.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Process */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold  mb-4">My Creative Process</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Each piece begins with inspiration and evolves through careful
              planning, experimentation, and passionate execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Inspiration</h3>
              <p className="text-sm">
                Finding that spark - whether from nature, emotion, or a fleeting
                moment that demands to be captured.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Sketching</h3>
              <p className="text-sm">
                Developing the initial concept through sketches, exploring
                composition, and refining the vision.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Creation</h3>
              <p className="text-sm">
                Bringing the piece to life with careful attention to technique,
                color, and emotional expression.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Refinement</h3>
              <p className="text-sm">
                Fine-tuning details, ensuring the piece meets my standards and
                conveys the intended emotion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Collection?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Explore my Portfolio to find the perfect piece for your space, or
            contact me to discuss a custom commission that&apos;s uniquely
            yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/portfolio"
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/90 transition-colors duration-200"
            >
              View Portfolio
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
