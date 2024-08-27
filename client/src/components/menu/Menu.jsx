import React, { useEffect, useState } from "react";
import Colds from "./Colds";
import useGetCategory from "../../hooks/useGetCategory";
import useItemsStorage from "../../zustand/useItemsStorage";
import useGetItems from "../../hooks/useGetItems";
import useCategoryStorage from "../../zustand/useCategoryStorage";
import useListenItems from "../../hooks/socketListener/useListenItem";
import useListenCategory from "../../hooks/socketListener/useListenCategory";
import { animate, motion } from "framer-motion";
import { fadeIn } from "../../assets/variants";
import { MdOpacity } from "react-icons/md";

const Menu = () => {
  useGetItems();
  const { waiting } = useGetCategory();
  const { categories } = useCategoryStorage();
  const { items } = useItemsStorage();
  const [filteredItemsMap, setFilteredItemsMap] = useState({});
  const filterItemsByCategory = (categoryId) => {
    return items.filter((item) => item.category === categoryId);
  };

  useListenItems();
  useListenCategory();
  useEffect(() => {
    const newFilteredItemsMap = {};
    categories.forEach((category) => {
      newFilteredItemsMap[category._id] = filterItemsByCategory(category._id);
    });
    setFilteredItemsMap(newFilteredItemsMap);
  }, [items, categories]);

  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * index,
      },
    }),
  };

  return (
    <div
      className="w-full h-auto bg-black text-white flex flex-col py-10 mb-10 items-center"
      id="menu"
    >
      {waiting && <span className="loading loading-spinner w-40"></span>}

      {categories.map((category) => {
        const itemsForCategory = filteredItemsMap[category._id] || [];

        return (
          <div
            key={category._id}
            className="w-full mt-10 flex flex-col items-center"
          >
            <h1 className="font-bold text-3xl border-t-4 border-b-4 w-full text-center">
              {category.title}
            </h1>

            {itemsForCategory.length > 0 ? (
              <div className="grid px-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-10 mt-8 md:p-12">
                {itemsForCategory
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInAnimationVariants}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: false }}
                      custom={index}
                    >
                      <Colds
                        id={item._id}
                        name={item.productName}
                        img={item.image}
                        mPrice={item.mPrice}
                        lPrice={item.lPrice}
                        description={item.description}
                        hearts={item.hearts}
                        createdAt={item.createdAt}
                      />
                    </motion.div>
                  ))}
              </div>
            ) : (
              <div className="text-white text-center font-bold text-3xl">
                Coming Soon!!
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
