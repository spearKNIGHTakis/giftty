import { useState } from "react";
import { CardGallery } from "@/components/CardGallery";
import { CardCustomizer } from "@/components/CardCustomizer";
import { CardSent } from "@/components/CardSent";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Send } from "lucide-react";
import { toast } from "sonner";

type AppState = "gallery" | "customize" | "sent";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("gallery");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [sentCardData, setSentCardData] = useState<any>(null);

  const handleSelectCard = (card: any) => {
    setSelectedCard(card);
    setCurrentState("customize");
  };

  const handleBackToGallery = () => {
    setCurrentState("gallery");
    setSelectedCard(null);
  };

  const handleSendCard = (cardData: any) => {
    // Simulate sending the card
    setSentCardData(cardData);
    setCurrentState("sent");
    
    // Show success toast
    toast.success("Card sent successfully!", {
      description: `Your ${cardData.card.category.toLowerCase()} card has been sent to ${cardData.recipient.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CardGift Ghana</h1>
                <p className="text-sm text-muted-foreground">Send love, share joy</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Gift className="w-4 h-4" />
                <span>Gifts in Ghana Cedi (₵)</span>
              </div>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentState === "gallery" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Send Beautiful Cards & Gifts
              </h2>
              <p className="text-lg text-muted-foreground">
                Create personalized greeting cards and add monetary gifts in Ghana Cedi. 
                Perfect for birthdays, anniversaries, congratulations, and thank you messages.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Custom Messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  <span>Add Money Gifts</span>
                </div>
              </div>
            </div>

            <CardGallery onSelectCard={handleSelectCard} />
          </div>
        )}

        {currentState === "customize" && selectedCard && (
          <CardCustomizer
            selectedCard={selectedCard}
            onBack={handleBackToGallery}
            onSendCard={handleSendCard}
          />
        )}

        {currentState === "sent" && sentCardData && (
          <CardSent
            cardData={sentCardData}
            onBackToGallery={handleBackToGallery}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-foreground">CardGift Ghana</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Spreading joy across Ghana, one card at a time. Send personalized greeting cards 
              with optional monetary gifts in Ghana Cedi.
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <span>• Secure Payments</span>
              <span>• Instant Delivery</span>
              <span>• 24/7 Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
