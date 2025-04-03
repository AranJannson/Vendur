import Link from "next/link";
import Image from "next/image";


export default async function category_display() {

// Images from https://www.shopify.com/stock-photos
    const categories = [
        { name: 'Electronics & Computing',
          src: "https://burst.shopifycdn.com/photos/portrait-of-illuminated-laptop.jpg?width=1200",  
          alt: "Portrait of Illuminated Laptop by Matthew Henry"
        },
        { name: 'Clothing & Shoes',
          src: "https://burst.shopifycdn.com/photos/clothes-on-a-rack-in-a-clothing-store.jpg?width=1200",  
          alt: "Clothes on a Rack in a Clothing Store by Markus Winkler"
        },
        { name: 'Home, Garden & DIY',
          src: "https://burst.shopifycdn.com/photos/picket-fence-flowers.jpg?width=1200",  
          alt: "Picket Fence Flowers by Shopify Partners"
        },
        { name: 'Health & Beauty',
          src: "https://burst.shopifycdn.com/photos/beauty-flatlay.jpg?width=1200",  
          alt: "Beauty Flatlay by Shopify Photos"
        },
        { name: 'Books, Films & Music',
          src: "https://burst.shopifycdn.com/photos/classic-book-with-detailed-cover.jpg?width=1200",  
          alt: "Classic Book with Detailed Cover by Sarah Pflug"
        },
        { name: 'Sport & Activity',
          src: "https://burst.shopifycdn.com/photos/soccer-cleats-and-ball.jpg?width=1200",  
          alt: "Soccer Cleats and Ball by Sarah Pflug"
        },
        { name: 'Stationary & Craft Supplies',
          src: 'https://burst.shopifycdn.com/photos/stationary-open-on-table.jpg?width=1200',
          alt: 'Stationary Open On Table - Photo by Sarah Pflug'
        },
        { name: 'Art & Collectables',
          src: "https://burst.shopifycdn.com/photos/street-painters-sell.jpg?width=1200",  
          alt: "Street Painters Sell by Angelique Downing"
        },
        { name: 'Pet Supplies',
          src: "https://burst.shopifycdn.com/photos/dog-fetching-disc.jpg?width=1200",  
          alt: "Dog Fetching Disc by Matthew Henry",
          shiftPercentage: '35%'
        },
        { name: 'Toys & Games',
          src: "https://burst.shopifycdn.com/photos/hand-of-cards-on-wood.jpg?width=1200",  
          alt: "Hand of Cards on Wood by Shopify Partners",
          shiftPercentage: '26%'
        },
    ];

    return (
        <div className="bg-primary-200 m-4 rounded-lg max-w-screen">
            <div className="bg-primary-300 p-4 rounded-t-xl rounded-b-xl">
                <h2 className="text-3xl font-semibold text-center p-4">
                    Explore All Of Our Categories
                </h2>
            </div>

            <div className="grid md:grid-cols-10 grid-cols-1 gap-8 p-4 bg-background-100 rounded-b-xl">
                {categories.map((category, catIndex) => (
                    <Link
                        href={{
                            pathname: "/products",
                            query: { category: category.name, sort: "relevance" },
                        }}
                        key={catIndex}
                        className="flex flex-col items-center text-center"
                    >
                        <h3 className="text-[15px] font-bold mb-1 text-[25px] min-h-[60px] flex items-center justify-center">{category.name}</h3>
                        <div className="gap-4 bg-background-50 p-1 rounded-xl">
                            <div className="relative group aspect-square rounded-xljustify-center items-center">
                                <img
                                    src={category.src} 
                                    alt={category.alt} 
                                    width="300"
                                    height="200"
                                    style={{
                                        width: '200px', 
                                        height: '400px', 
                                        objectFit: 'cover', 
                                        objectPosition: `${category.shiftPercentage} center`
                                    }}
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
