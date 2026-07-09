"use client";

import { DraggableGrid } from "@/components/ui/draggable-grid";
import Image from "next/image";

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    row: 0,
    col: 0,
    image: "/images/assets/haruka.jpg",
    label: "Portrait 01",
  },
  {
    id: 2,
    row: 0,
    col: 1,
    image: "/images/assets/hero.jpg",
    label: "Portrait 02",
  },
  {
    id: 3,
    row: 1,
    col: 0,
    image: "/images/assets/haruka.jpg",
    label: "Portrait 03",
  },
  {
    id: 4,
    row: 1,
    col: 1,
    image: "/images/assets/hero.jpg",
    label: "Portrait 04",
  },
  {
    id: 5,
    row: 2,
    col: 0,
    image: "/images/assets/haruka.jpg",
    label: "Portrait 05",
  },
  {
    id: 6,
    row: 2,
    col: 1,
    image: "/images/assets/hero.jpg",
    label: "Portrait 06",
  },
] as const;

export function PortfolioGrid() {
  return (
    <DraggableGrid.Root rows={6} cols={4} iconMargin={240} iconSize={100}>
      <DraggableGrid.Grid>
        {PORTFOLIO_ITEMS.map((item, index) => (
          <DraggableGrid.Item
            key={item.id}
            row={item.row}
            col={item.col}
            index={index}
            item={item}
          >
            <Image src={item.image} alt={item.label} width={120} height={120} className="w-full h-full object-cover" />
          </DraggableGrid.Item>
        ))}
      </DraggableGrid.Grid>
    </DraggableGrid.Root>
  );
}
