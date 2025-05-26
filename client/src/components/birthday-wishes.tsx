import { motion } from 'framer-motion';
import { Heart, Star, Gift } from 'lucide-react';

const wishes = [
  {
    message: "May your birthday be the start of a year filled with good luck, good health, and much happiness. You deserve all the wonderful things that life has to offer!",
    from: "With love and best wishes 💜",
    icon: Heart,
    gradient: "from-pink-500 to-purple-600"
  },
  {
    message: "Your kindness, wisdom, and beautiful spirit have touched so many lives. Today we celebrate not just your birthday, but the amazing person you are!",
    from: "Someone special ✨",
    icon: Star,
    gradient: "from-yellow-400 to-pink-500"
  },
  {
    message: "Another year older, another year wiser, and another year more wonderful! Here's to celebrating you and all the joy you bring to the world.",
    from: "Your secret admirer 🎁",
    icon: Gift,
    gradient: "from-purple-500 to-yellow-400"
  }
];

export default function BirthdayWishes() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="font-playfair text-4xl md:text-5xl font-bold gradient-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Birthday Wishes
          </motion.h2>
          <motion.p
            className="font-montserrat text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Special messages just for you
          </motion.p>
        </div>

        <div className="space-y-8">
          {wishes.map((wish, index) => {
            const IconComponent = wish.icon;
            return (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-8 transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-br ${wish.gradient} rounded-full p-3 flex-shrink-0`}>
                    <IconComponent className="text-white h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-montserrat text-lg text-gray-700 leading-relaxed mb-3">
                      "{wish.message}"
                    </p>
                    <p className="font-montserrat text-sm text-purple-600 font-medium">
                      {wish.from}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
