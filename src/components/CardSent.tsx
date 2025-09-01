import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Send, Gift, Home } from "lucide-react";

interface CardSentProps {
  cardData: any;
  onBackToGallery: () => void;
}

export const CardSent = ({ cardData, onBackToGallery }: CardSentProps) => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Success Animation */}
      <div className="space-y-4">
        <div className="mx-auto w-20 h-20 bg-success rounded-full flex items-center justify-center animate-pulse">
          <CheckCircle className="w-10 h-10 text-success-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Card Sent Successfully! 🎉</h1>
        <p className="text-lg text-muted-foreground">
          Your {cardData.card.category.toLowerCase()} card has been sent to {cardData.recipient.name}
        </p>
      </div>

      {/* Card Summary */}
      <Card className="p-6 text-left">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Send className="w-5 h-5" />
          Card Details
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Card Type:</span>
            <span className="font-medium">{cardData.card.title}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Recipient:</span>
            <span className="font-medium">{cardData.recipient.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{cardData.recipient.email}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">From:</span>
            <span className="font-medium">{cardData.sender}</span>
          </div>
          
          {cardData.gift && (
            <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Gift Amount:</span>
              </div>
              <span className="font-semibold text-accent">₵{cardData.gift.amount}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Message Preview */}
      <Card className="p-6 text-left">
        <h3 className="text-lg font-semibold mb-3">Your Message</h3>
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-foreground leading-relaxed">
            {cardData.emoji} {cardData.message}
          </p>
          <p className="text-sm text-muted-foreground mt-2">- {cardData.sender}</p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="hero" onClick={onBackToGallery} className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Send Another Card
        </Button>
        
        <Button variant="outline" onClick={() => window.location.reload()}>
          Start Over
        </Button>
      </div>

      {/* Additional Info */}
      <div className="text-sm text-muted-foreground space-y-2">
        <p>📧 The recipient will receive an email notification</p>
        {cardData.gift && (
          <p>💳 Gift processing may take 1-2 business days</p>
        )}
      </div>
    </div>
  );
};