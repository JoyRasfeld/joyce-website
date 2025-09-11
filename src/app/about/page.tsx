import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-homepage">
      {/* Hero Section */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-earth-brown mb-6">
              About Joyce
            </h1>
            <p className="text-xl text-earth-brown-2 max-w-3xl mx-auto">
              A creative soul exploring the world through the process of making
              art.
            </p>
          </div>
        </div>
      </section>

      {/* Artist Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-earth-brown mb-6">
                My Journey
              </h2>
              <p className="text-lg text-earth-brown-2 mb-6">
                I have been passionate about drawing since childhood, finding
                creativity to be my natural language of expression. I earned a
                B.S. in Studio Art and a B.F.A. in Art Education from Miami
                University, where I deepened my love for using art as both a way
                to understand the world and to share my perspective with others.
              </p>
              <p className="text-lg text-earth-brown-2 mb-6">
                Inspired by the beauty of everyday life, I often draw from the
                colors, shapes, and spatial relationships I observe in outdoor
                scenery. Each piece I create is a reflection of my experiences,
                emotions, and the world around me.
              </p>
              <p className="text-lg text-earth-brown-2">
                When I'm not creating, I enjoy time at home with my husband, our
                two young children and a lively household of four cats. I
                believe that art has the power to transform spaces and touch
                hearts, and I'm honored to share my work with collectors who
                appreciate the beauty and meaning behind each brushstroke.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-xl bg-peach w-80 h-80 mx-auto">
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
        </div>
      </section>

      {/* Inspiration */}
      <section className="py-20 bg-homepage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-earth-brown mb-4">
              What Inspires Me
            </h2>
            <p className="text-xl text-earth-brown-2 max-w-2xl mx-auto">
              My work draws inspiration from the natural world, human emotion,
              and the interplay of light and shadow that surrounds us every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-peach rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-earth-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-earth-brown mb-3">
                Nature
              </h3>
              <p className="text-earth-brown-2">
                The ever-changing landscapes, seasons, and natural phenomena
                provide endless inspiration for color palettes, textures, and
                compositions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-peach rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-earth-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-earth-brown mb-3">
                Emotion
              </h3>
              <p className="text-earth-brown-2">
                Human emotions, relationships, and the complexity of the human
                experience drive me to create pieces that resonate on a deeply
                personal level.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-peach rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-earth-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-earth-brown mb-3">
                Light & Shadow
              </h3>
              <p className="text-earth-brown-2">
                The dramatic interplay of light and shadow creates depth, mood,
                and visual interest that I love to capture in my work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className="py-20">
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
              <h2 className="text-3xl font-bold text-earth-brown mb-6">
                My Studio
              </h2>
              <p className="text-lg text-earth-brown-2 mb-6">
                Located in the heart of the art community, my studio is a space
                where creativity knows no bounds. Natural light floods through
                large windows, creating the perfect environment for painting and
                drawing.
              </p>
              <p className="text-lg text-earth-brown-2 mb-6">
                Every corner of the studio is filled with inspiration - from my
                collection of art books and reference materials to the carefully
                organized palette of paints and brushes that I use to bring my
                visions to life.
              </p>
              <p className="text-lg text-earth-brown-2">
                I welcome visitors by appointment, as I believe that seeing the
                creative process firsthand helps collectors connect more deeply
                with the artwork they choose to bring into their homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-homepage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-earth-brown mb-4">
              My Creative Process
            </h2>
            <p className="text-xl text-earth-brown-2 max-w-2xl mx-auto">
              Each piece begins with inspiration and evolves through careful
              planning, experimentation, and passionate execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-earth-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-earth-brown mb-2">
                Inspiration
              </h3>
              <p className="text-earth-brown-2 text-sm">
                Finding that spark - whether from nature, emotion, or a fleeting
                moment that demands to be captured.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-earth-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-earth-brown mb-2">
                Sketching
              </h3>
              <p className="text-earth-brown-2 text-sm">
                Developing the initial concept through sketches, exploring
                composition, and refining the vision.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-earth-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-earth-brown mb-2">
                Creation
              </h3>
              <p className="text-earth-brown-2 text-sm">
                Bringing the piece to life with careful attention to technique,
                color, and emotional expression.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-earth-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-earth-brown mb-2">
                Refinement
              </h3>
              <p className="text-earth-brown-2 text-sm">
                Fine-tuning details, ensuring the piece meets my standards and
                conveys the intended emotion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-earth-green">
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
              className="bg-white text-earth-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/90 transition-colors duration-200"
            >
              View Portfolio
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-earth-green transition-colors duration-200"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
