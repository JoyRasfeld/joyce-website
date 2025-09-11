'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        reset(); // Clear the form
      } else {
        toast.error(
          result.error || 'Failed to send message. Please try again.'
        );
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <h2 className="text-3xl font-bold text-earth-brown mb-6">
        Send a Message
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-earth-brown-2 mb-2"
            >
              Name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              {...register('name')}
              className={`w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-[#3f6f54] focus:border-transparent bg-white/70 text-earth-brown placeholder:text-earth-brown-2 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-earth-brown-2 mb-2"
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
              className={`w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-[#3f6f54] focus:border-transparent bg-white/70 text-earth-brown placeholder:text-earth-brown-2 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-earth-brown-2 mb-2"
          >
            Subject *
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Project Inquiry"
            {...register('subject')}
            className={`w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-[#3f6f54] focus:border-transparent bg-white/70 text-earth-brown placeholder:text-earth-brown-2 ${
              errors.subject ? 'border-red-500' : ''
            }`}
          />
          {errors.subject && (
            <p className="text-sm text-red-600 mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-earth-brown-2 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            placeholder="Tell me about your inquiry..."
            rows={6}
            className={`w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-[#3f6f54] focus:border-transparent bg-white/70 resize-none text-earth-brown placeholder:text-earth-brown-2 ${
              errors.message ? 'border-red-500' : ''
            }`}
            {...register('message')}
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-earth-green text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !isValid || !isDirty}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
