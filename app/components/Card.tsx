"use client";
import React from "react";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";

interface ICardProps {
  title: string;
  img: string;
  room: string;
  tag: Array<string>;
}
const BlogCard = ({ title, img, room, tag }: ICardProps) => {
  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => console.log("item pressed")}
      className="bg-secondary p-4 w-full"
    >
      <CardBody className="overflow-visible p-0 grid gap-4">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={title}
          className="w-full object-cover h-[140px]"
          src={img}
        />
        <p className="font-semibold text-medium pt-2">{title}</p>
        <div className="grid gap-2">
          <div>
            {tag.map((item) => (
              <Chip key={item} color="secondary" className="mr-2 bg-background">
                {item}
              </Chip>
            ))}
          </div>
          <p className="text-default-500">room : {room}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
