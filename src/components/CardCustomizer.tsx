import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Send, Heart, Star, Smile, Gift as GiftIcon } from "lucide-react";

interface CardType {
  id: string;
  title: string;
  category: string;
  image: string;
  defaultMessage: string;
}

interface CardCustomizerProps {
  selectedCard: CardType;
  onBack: () => void;
  onSendCard: (cardData: any) => void;
}

export const CardCustomizer = ({ selectedCard, onBack, onSendCard }: CardCustomizerProps) => {
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState(selectedCard.defaultMessage);
  const [senderName, setSenderName] = useState("");
  const [includeGift, setIncludeGift] = useState(false);
  const [giftAmount, setGiftAmount] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎉");

  const emojis = ["🎉", "💕", "🎂", "🏆", "🙏", "⭐", "💖", "🎈", "🌟", "💐"];

  const handleSendCard = () => {
    const cardData = {
      card: selectedCard,
      recipient: {
        name: recipientName,
        email: recipientEmail
      },
      message,
      sender: senderName,
      emoji: selectedEmoji,
      gift: includeGift ? {
        amount: parseFloat(giftAmount),
        currency: "GHS" // Ghana Cedi
      } : null
    };
    onSendCard(cardData);
  };

  const isFormValid = recipientName && recipientEmail && message && senderName && (!includeGift || giftAmount);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gallery
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Customize Your {selectedCard.category} Card</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Card Preview</h3>
          <Card className="overflow-hidden shadow-lg">
            <div className="relative aspect-[4/3]">
              <img 
                src={selectedCard.image} 
                alt={selectedCard.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-2xl mb-2">{selectedEmoji}</div>
                <p className="text-lg font-medium leading-relaxed">{message}</p>
                {senderName && (
                  <p className="text-sm mt-2 opacity-90">- {senderName}</p>
                )}
              </div>
            </div>
            {includeGift && giftAmount && (
              <div className="p-4 bg-accent text-accent-foreground">
                <div className="flex items-center gap-2">
                  <GiftIcon className="w-5 h-5" />
                  <span className="font-semibold">Gift Included: ₵{giftAmount}</span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Customization Form */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Customize Your Card</h3>
          
          {/* Recipient Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter recipient's name"
              />
            </div>
            <div>
              <Label htmlFor="recipientEmail">Recipient Email</Label>
              <Input
                id="recipientEmail"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="Enter recipient's email"
              />
            </div>
          </div>

          {/* Message Customization */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your personal message..."
                rows={4}
              />
            </div>
            
            {/* Emoji Selection */}
            <div>
              <Label>Choose an Emoji</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {emojis.map((emoji) => (
                  <Button
                    key={emoji}
                    variant={selectedEmoji === emoji ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedEmoji(emoji)}
                    className="text-lg"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Sender Name */}
          <div>
            <Label htmlFor="senderName">Your Name</Label>
            <Input
              id="senderName"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          {/* Gift Option */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="includeGift" className="text-base font-medium">
                  Include a Gift
                </Label>
                <p className="text-sm text-muted-foreground">Add money to your card</p>
              </div>
              <Switch
                id="includeGift"
                checked={includeGift}
                onCheckedChange={setIncludeGift}
              />
            </div>
            
            {includeGift && (
              <div>
                <Label htmlFor="giftAmount">Gift Amount (₵)</Label>
                <Input
                  id="giftAmount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={giftAmount}
                  onChange={(e) => setGiftAmount(e.target.value)}
                  placeholder="Enter amount in Ghana Cedi"
                />
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button 
            variant="hero"
            size="lg"
            className="w-full"
            onClick={handleSendCard}
            disabled={!isFormValid}
          >
            <Send className="w-5 h-5 mr-2" />
            Send Card {includeGift && giftAmount && `with ₵${giftAmount} Gift`}
          </Button>
        </div>
      </div>
    </div>
  );
};