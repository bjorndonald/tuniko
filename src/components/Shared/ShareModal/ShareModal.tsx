"use client";
import Modal from "@/components/Common/Modal";
import React from "react";
import { Facebook, Instagram, Link as LinkIcon, Twitter } from "react-feather";
import WhatsappIcon from "./Whatsapp.icon";
import TelegramIcon from "./Telegram.icon";
import useCorpus from "@/store/corpus";
import { doCopyText } from "@/utils/copy";

const ShareModal = () => {
  const shareModal = useCorpus(s => s.shareModal);
  const showShareModal = useCorpus(s => s.showShareModal);
  const shareLink = `${process.env.NEXT_PUBLIC_DOMAIN_URI}/translation/${shareModal}`;
  return (
    <Modal show={!!shareModal} onClose={() => showShareModal(undefined)}>
      <div className="flex items-center justify-center">
        <p className="text-xl font-bold">Share Modal</p>
      </div>

      <div className="my-4">
        <p className="text-sm">Share this link via</p>

        <div className="my-4 flex justify-around">
          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-blue-200 fill-[#1877f2] shadow-xl hover:bg-[#1877f2] hover:fill-white hover:shadow-blue-500/50">
            <Facebook />
          </div>

          <div className="hover:shadow-sky-500/50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-blue-200 fill-[#1d9bf0] shadow-xl hover:bg-[#1d9bf0] hover:fill-white">
            <Twitter />
          </div>

          <div className="border-pink-200 hover:shadow-pink-500/50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border fill-[#bc2a8d] shadow-xl hover:bg-[#bc2a8d] hover:fill-white">
            <Instagram />
          </div>

          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-green-200 fill-[#25D366] shadow-xl hover:bg-[#25D366] hover:fill-white hover:shadow-green-500/50">
            <WhatsappIcon />
          </div>

          <div className="border-sky-200 hover:shadow-sky-500/50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border fill-[#229ED9] shadow-xl hover:bg-[#229ED9] hover:fill-white">
            <TelegramIcon />
          </div>
        </div>

        <p className="text-sm">Or copy link</p>
        <div className="border-gray-200 mt-4 flex items-center justify-between gap-2 rounded-box border px-2 py-2">
          <LinkIcon />

          <input
            className="w-full overflow-x-hidden text-ellipsis whitespace-nowrap bg-transparent outline-none"
            type="text"
            disabled
            placeholder="link"
            value={shareLink}
          />

          <button
            onClick={() => doCopyText(shareLink)}
            className="btn btn-primary btn-sm"
          >
            Copy
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
