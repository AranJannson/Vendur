"use client";

import React, {useEffect, useState} from "react";
import { modifyStock, setOriginalStock } from "@/utils/catalogue/utils";
import { postItem } from "@/utils/payment/utils";
import Modal from "@/app/components/admin/VerificationFormModal";
import {useUser} from "@stackframe/stack";

export default function AddToBasketButton( { item, formId, originalStock }: { item: any, formId: string, originalStock: number }) {

    const user = useUser();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        window.location.reload();
    };

    useEffect(() => {
        const key = `hasSetStock-${item.id}`;
        if (!sessionStorage.getItem(key)) {
          setOriginalStock(item.id, originalStock);
          sessionStorage.setItem(key, "true");
        }
      }, [item.id, originalStock]);

    const handleClick = async () => {
        try {
            const form = document.getElementById(formId) as HTMLFormElement;
            const quantityInput = form?.querySelector("input[name='quantity']") as HTMLInputElement;
            const selectedQuantity = quantityInput ? Number(quantityInput.value) : 1;
            const sizeInput = form?.querySelector("select[name='size']") as HTMLInputElement;
            const size = sizeInput ? String(sizeInput.value) : null;

            openModal();
            console.log(`Adding ${selectedQuantity} (or ${quantityInput.value}) of item ${item.id} to basket while removing ${selectedQuantity} from stock`);
            const response = postItem(user!.id, new Date().toISOString(), item.id);
            const stockResponse = modifyStock(item.id, -selectedQuantity);


        } catch (error) {
            console.error("Failed to add item: ", error);
        }
    };

    return <div>
        <button type="button"
            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4"
            onClick={handleClick}
            >
                    Add to Basket
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-lg font-semibold">Item Added to Basket</h2>
                <p className="text-gray-600">You have successfully added <b>{item.name}</b> to your basket.</p>
            </div>
        </Modal>
    </div>;
}