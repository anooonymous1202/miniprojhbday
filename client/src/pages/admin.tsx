import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import type { Feedback } from '@shared/schema';

export default function AdminPage() {
  const { data: feedbacks, isLoading, error } = useQuery<Feedback[]>({
    queryKey: ['/api/feedback'],
    queryFn: async () => {
      const response = await fetch('/api/feedback');
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="font-montserrat text-lg text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="font-montserrat text-lg text-red-600">Error loading messages</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Birthday Page
              </Button>
            </Link>
            <div>
              <h1 className="font-playfair text-4xl font-bold gradient-text">
                Birthday Messages
              </h1>
              <p className="font-montserrat text-gray-600 mt-2">
                Messages from Haasika about her birthday surprise
              </p>
            </div>
          </div>
        </div>

        {!feedbacks || feedbacks.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-bold text-gray-700 mb-2">
                No Messages Yet
              </h3>
              <p className="font-montserrat text-gray-600">
                When Haasika sends her feedback, it will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="font-montserrat text-lg text-gray-700">
                Total Messages: <span className="font-bold text-pink-600">{feedbacks.length}</span>
              </p>
            </div>
            
            <div className="grid gap-6 max-w-4xl mx-auto">
              {feedbacks.map((feedback, index) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-montserrat font-semibold text-gray-800">
                          Message #{feedbacks.length - index}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                        <p className="font-montserrat text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {feedback.message}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}