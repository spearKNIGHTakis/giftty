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

const generateCards = (): CardType[] => {
  const baseCards = [
    {
      category: "Birthday",
      icon: PartyPopper,
      image: birthdayCard,
      messages: [
        "Happy Birthday! Wishing you a day filled with joy and celebration! 🎉",
        "Another year older, another year wiser! Have a fantastic birthday! 🎂",
        "May your birthday be as special as you are! Celebrate big! 🎈",
        "Sending you warm birthday wishes and lots of love! 🎁",
        "Hope your birthday is absolutely amazing! Party time! 🥳",
        "Wishing you happiness, health, and all your heart desires! 🌟",
        "May this new year of life bring you endless opportunities! 💫",
        "Happy Birthday to someone who lights up every room! ✨",
        "Celebrating you today and always! Have the best day! 🎊",
        "May your birthday be filled with laughter and sweet memories! 😊"
      ]
    },
    {
      category: "Anniversary",
      icon: Heart,
      image: anniversaryCard,
      messages: [
        "Happy Anniversary! Here's to many more years of love and happiness! 💕",
        "Celebrating your beautiful love story today! Cheers to you both! 🥂",
        "Another year of love, laughter, and togetherness! Congratulations! 💖",
        "Your love continues to inspire everyone around you! Happy Anniversary! 💝",
        "May your love grow stronger with each passing year! 💗",
        "Wishing you both endless happiness and romance! 🌹",
        "Here's to the perfect couple on your special day! 💑",
        "Your journey together is truly beautiful! Happy Anniversary! 💐",
        "May your love story continue to be magical! 💫",
        "Celebrating the love that brings you two together! 💞"
      ]
    },
    {
      category: "Congratulations",
      icon: Trophy,
      image: congratsCard,
      messages: [
        "Congratulations on your amazing achievement! You deserve all the success! 🏆",
        "Your hard work has paid off! So proud of your accomplishment! 🌟",
        "Well done! You've reached an incredible milestone! 🎯",
        "Congratulations! Your dedication and perseverance have led you here! 💪",
        "What an outstanding achievement! You should be very proud! 🥇",
        "Bravo! Your success is well-deserved and inspiring! 👏",
        "Congratulations on this fantastic accomplishment! Keep shining! ✨",
        "You did it! Your achievement is truly remarkable! 🎊",
        "So excited to celebrate your success with you! Well done! 🎉",
        "Your achievement is proof that dreams do come true! Congrats! 🌈"
      ]
    },
    {
      category: "Thank You",
      icon: Gift,
      image: thankyouCard,
      messages: [
        "Thank you so much for everything! Your kindness means the world to me! 🙏",
        "I'm so grateful for your support and friendship! Thank you! 💚",
        "Your thoughtfulness never goes unnoticed! Thank you from my heart! ❤️",
        "Thank you for being such an amazing person! You're appreciated! 🌸",
        "I can't thank you enough for all that you do! You're wonderful! 🌻",
        "Your generosity and kindness have touched my heart! Thank you! 💝",
        "Thank you for making such a positive difference in my life! 🌟",
        "I'm blessed to have someone like you! Thank you for everything! 🙏",
        "Your support means more than you'll ever know! Thank you! 💕",
        "Thank you for being you! Your kindness is truly special! 🌺"
      ]
    }
  ];

  const cards: CardType[] = [];
  
  baseCards.forEach((baseCard, categoryIndex) => {
    for (let i = 1; i <= 50; i++) {
      const messageIndex = (i - 1) % baseCard.messages.length;
      cards.push({
        id: `${baseCard.category.toLowerCase().replace(' ', '')}-${i}`,
        title: `${baseCard.category} Card ${i}`,
        category: baseCard.category,
        image: baseCard.image,
        icon: baseCard.icon,
        defaultMessage: baseCard.messages[messageIndex]
      });
    }
  });

  return cards;
};

const cardTypes: CardType[] = generateCards();

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