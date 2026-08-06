import React, { useState, useEffect, useRef } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";
import {
  Upload,
  X,
  Image as ImageIcon,
  Trash2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Video,
  Link,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";

// Rich Text Toolbar Component
const MenuBar = ({ editor, onOpenEmbedModal }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1.5 rounded-t-xl border-b border-slate-200 text-slate-700">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded-lg hover:bg-slate-200 transition ${
          editor.isActive("bold") ? "bg-slate-300 text-black font-bold" : ""
        }`}
        title="Bold"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded-lg hover:bg-slate-200 transition ${
          editor.isActive("italic") ? "bg-slate-300 text-black" : ""
        }`}
        title="Italic"
      >
        <Italic className="w-3.5 h-3.5" />
      </button>

      <div className="w-[1px] h-4 bg-slate-300 mx-1" />

      {/* Headings */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1.5 rounded-lg hover:bg-slate-200 transition ${
          editor.isActive("heading", { level: 1 })
            ? "bg-slate-300 text-black"
            : ""
        }`}
        title="Heading 1 (24px)"
      >
        <Heading1 className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded-lg hover:bg-slate-200 transition ${
          editor.isActive("heading", { level: 2 })
            ? "bg-slate-300 text-black"
            : ""
        }`}
        title="Heading 2 (20px)"
      >
        <Heading2 className="w-3.5 h-3.5" />
      </button>

      <div className="w-[1px] h-4 bg-slate-300 mx-1" />

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded-lg hover:bg-slate-200 transition ${
          editor.isActive("bulletList") ? "bg-slate-300 text-black" : ""
        }`}
        title="Bullet List"
      >
        <List className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded-lg hover:bg-slate-200 transition ${
          editor.isActive("orderedList") ? "bg-slate-300 text-black" : ""
        }`}
        title="Numbered List"
      >
        <ListOrdered className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1.5 rounded-lg hover:bg-slate-200 transition ${
          editor.isActive("blockquote") ? "bg-slate-300 text-black" : ""
        }`}
        title="Blockquote"
      >
        <Quote className="w-3.5 h-3.5" />
      </button>

      <div className="w-[1px] h-4 bg-slate-300 mx-1" />

      {/* Custom Modal Embed Triggers */}
      <button
        type="button"
        onClick={() => onOpenEmbedModal("image")}
        className="p-1.5 bg-[#073E7D]/10 text-[#073E7D] rounded-lg hover:bg-[#073E7D]/20 font-bold flex items-center gap-1 text-[11px] transition"
        title="Embed Image"
      >
        <ImageIcon className="w-3.5 h-3.5" /> Image
      </button>

      <button
        type="button"
        onClick={() => onOpenEmbedModal("video")}
        className="p-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-bold flex items-center gap-1 text-[11px] transition"
        title="Embed Video"
      >
        <Video className="w-3.5 h-3.5" /> Video
      </button>
    </div>
  );
};

export default function EditUpdateModal({ onSaveSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemData, setItemData] = useState(null);

  // Single Form Data State
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    selectedFile: null,
    previewUrl: "",
  });

  // Custom Embed Modal State (Replaces Browser Prompts)
  const [embedModal, setEmbedModal] = useState({
    isOpen: false,
    type: "", // 'image' | 'video'
    url: "",
  });

  const fileInputRef = useRef(null);
  const modalId = "edit_update_modal";

  // TipTap Rich Text Editor Configuration
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "focus:outline-none focus:ring-0 prose max-w-none text-base text-slate-800 min-h-[160px] max-h-[250px] overflow-y-auto p-3 [&_h1]:text-[24px] [&_h1]:font-extrabold [&_h1]:mb-2 [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-3 [&_blockquote]:italic",
      },
    },
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        text: editor.getHTML(),
      }));
    },
  });

  useEffect(() => {
    const unregister = globalModal.register(modalId, (openState, data) => {
      setIsOpen(openState);
      setItemData(data);

      if (data) {
        setFormData({
          title: data.title || "",
          text: data.text || "",
          selectedFile: null,
          previewUrl: data.image || "",
        });
        if (editor) {
          editor.commands.setContent(data.text || "");
        }
      } else {
        resetForm();
      }
    });

    return () => unregister();
  }, [editor]);

  const resetForm = () => {
    setFormData({
      title: "",
      text: "",
      selectedFile: null,
      previewUrl: "",
    });
    if (editor) editor.commands.setContent("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    setIsOpen(false);
    setItemData(null);
    resetForm();
  };

  // Embed Confirmation
  const handleConfirmEmbed = (e) => {
    e.preventDefault();
    if (!embedModal.url || !editor) return;

    if (embedModal.type === "image") {
      editor.chain().focus().setImage({ src: embedModal.url }).run();
    } else if (embedModal.type === "video") {
      editor.chain().focus().setYoutubeVideo({ src: embedModal.url }).run();
    }

    setEmbedModal({ isOpen: false, type: "", url: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      selectedFile: file,
      previewUrl: URL.createObjectURL(file),
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      selectedFile: null,
      previewUrl: "",
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    if (itemData?.id) {
      payload.append("id", itemData.id);
    }
    payload.append("title", formData.title);
    payload.append("text", formData.text);

    if (formData.selectedFile) {
      payload.append("image", formData.selectedFile);
    }

    if (onSaveSuccess) {
      onSaveSuccess({
        formDataPayload: payload,
        uiPreviewData: {
          id: itemData?.id || `up_${Date.now()}`,
          title: formData.title,
          text: formData.text,
          image: formData.previewUrl,
        },
      });
    }

    handleClose();
  };

  return (
    <>
      <MotherModal
        isOpen={isOpen}
        onClose={handleClose}
        title={itemData ? "Edit Update Post" : "Create New Update Post"}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title Input */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
              Update Headline <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              name="title"
              placeholder="e.g. Weekend cashback offer: Get 10% cashback"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#073E7D]"
            />
          </div>

          {/* Rich Text Editor Container */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
              Description & Content <span className="text-rose-500">*</span>
            </label>
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 focus-within:border-[#073E7D] transition">
              <MenuBar
                editor={editor}
                onOpenEmbedModal={(type) =>
                  setEmbedModal({ isOpen: true, type, url: "" })
                }
              />
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Featured Header Banner Upload */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
              Featured Banner Image
            </label>

            <input
              type="file"
              ref={fileInputRef}
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {formData.previewUrl ? (
              <div className="relative h-24 rounded-xl overflow-hidden border border-slate-200 group bg-slate-900">
                <img
                  src={formData.previewUrl}
                  alt="Update Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 bg-white rounded-lg text-slate-800 text-xs font-bold flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" /> Change
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/70 text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-3 text-center hover:border-[#073E7D] hover:bg-blue-50/20 cursor-pointer transition flex flex-col items-center justify-center space-y-1 bg-slate-50"
              >
                <ImageIcon className="w-4 h-4 text-slate-400" />
                <p className="text-[11px] font-bold text-slate-600">
                  Click to upload main banner image
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-1.5 bg-slate-100 rounded-xl text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#073E7D] text-white font-bold text-xs rounded-xl hover:bg-[#052d5b] shadow-sm transition"
            >
              {itemData ? "Save Changes" : "Post Update"}
            </button>
          </div>
        </form>
      </MotherModal>

      {/* Internal Modal for URL Input (No Native Prompts) */}
      <MotherModal
        isOpen={embedModal.isOpen}
        onClose={() => setEmbedModal({ isOpen: false, type: "", url: "" })}
        title={`Embed ${embedModal.type === "image" ? "Image" : "Video"} Link`}
      >
        <form onSubmit={handleConfirmEmbed} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
              Enter{" "}
              {embedModal.type === "image" ? "Image URL" : "YouTube Video URL"}
            </label>
            <input
              type="url"
              required
              placeholder={
                embedModal.type === "image"
                  ? "https://example.com/image.jpg"
                  : "https://www.youtube.com/watch?y=..."
              }
              value={embedModal.url}
              onChange={(e) =>
                setEmbedModal((prev) => ({ ...prev, url: e.target.value }))
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#073E7D]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setEmbedModal({ isOpen: false, type: "", url: "" })
              }
              className="px-3 py-1.5 bg-slate-100 rounded-xl text-slate-700 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#073E7D] text-white font-bold text-xs rounded-xl hover:bg-[#052d5b]"
            >
              Insert
            </button>
          </div>
        </form>
      </MotherModal>
    </>
  );
}
