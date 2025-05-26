import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Thank you! 💕",
        description: "Your message has been received with love!",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-16 bg-gradient-to-br from-pink-50 to-purple-50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl mb-4">💕</div>
            <h3 className="font-playfair text-3xl font-bold gradient-text mb-4">
              Thank You, Haasika!
            </h3>
            <p className="font-montserrat text-lg text-gray-600">
              Your message has been received with so much love! It means the world to know how this made you feel. 
              Hope your 18th birthday was absolutely magical! ✨
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-pink-500" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold gradient-text">
              Share Your Thoughts
            </h2>
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
          <p className="font-montserrat text-xl text-gray-700 leading-relaxed">
            Hey, I hope you loved the birthday wishes! Feel free to share how it made you feel 😊 I'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-montserrat text-lg font-medium text-gray-700 mb-3 block">
                How did this birthday surprise make you feel? 💭
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts, feelings, or just say hi! I'd love to know if this brought a smile to your face... ✨"
                className="min-h-32 text-lg font-montserrat border-2 border-pink-200 focus:border-pink-400 rounded-2xl p-4 resize-none"
                disabled={isSubmitting}
              />
            </div>
            
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={!message.trim() || isSubmitting}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 rounded-full font-montserrat font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-3" />
                    Send Your Message
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <div className="mt-8 text-center">
            <p className="font-montserrat text-sm text-gray-500">
              Your message will be delivered with lots of love 💕
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}