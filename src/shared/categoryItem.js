"use client";
import Image from 'next/image'
import React from 'react'

export default function CategoryItem({ categories, selectedCategory, onCategorySelect }) {
    return (
        <div className="flex items-center gap-3">
            {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory?.id === category.id;
                return (
                    <button
                        key={category.id}
                        onClick={() => onCategorySelect(category)}
                        className={`flex shrink-0 items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer text-black font-medium bg-white border
                        ${isActive ? "border-brand-dark-green" : "border-brand-light-gray hover:border-brand-dark-green"}`}
                    >
                        {Icon && (
                            <Image src={Icon} alt={category.label} />
                        )}
                        <span className="text-sm">{category.label}</span>
                    </button>
                );
            })}
        </div>
    )
}
