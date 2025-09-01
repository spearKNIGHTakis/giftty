import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Heart, PartyPopper, Trophy } from "lucide-react";

// Import card images
import birthdayCard from "@/assets/birthday-card.jpg";
import anniversaryCard from "@/assets/anniversary-card.jpg";
import congratsCard from "@/assets/congrats-card.jpg";
import thankyouCard from "@/assets/thankyou-card.jpg";

interface CardType {
  id: string;
  title: string;
  category: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultMessage: string;
}

const cardTypes: CardType[] = [
  {
    id: "birthday",
    title: "Birthday Wishes",
    category: "Birthday",
    image: birthdayCard,
    icon: PartyPopper,
    defaultMessage: "Happy Birthday! Wishing you a day filled with joy and celebration! 🎉"
  },
  {
    id: "anniversary",
    title: "Anniversary Love",
    category: "Anniversary", 
    image: anniversaryCard,
    icon: Heart,
    defaultMessage: "Happy Anniversary! Here's to many more years of love and happiness! 💕"
  },
  {
    id: "congrats",
    title: "Congratulations",
    category: "Congratulations",
    image: congratsCard,
    icon: Trophy,
    defaultMessage: "Congratulations on your amazing achievement! You deserve all the success! 🏆"
  },
  {
    id: "thankyou",
    title: "Thank You",
    category: "Thank You",
    image: thankyouCard,
    icon: Gift,
    defaultMessage: "Thank you so much for everything! Your kindness means the world to me! 🙏"
  }
];

interface CardGalleryProps {
  onSelectCard: (card: CardType) => void;
}

export const CardGallery = ({ onSelectCard }: CardGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const categories = ["all", ...Array.from(new Set(cardTypes.map(card => card.category)))];
  
  const filteredCards = selectedCategory === "all" 
    ? cardTypes 
    : cardTypes.filter(card => card.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Card</h2>
        <p className="text-muted-foreground">Select a beautiful card to customize and send</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card 
              key={card.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
              onClick={() => onSelectCard(card)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  <IconComponent className="w-3 h-3 mr-1" />
                  {card.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-card-foreground mb-1">{card.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {card.defaultMessage}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};