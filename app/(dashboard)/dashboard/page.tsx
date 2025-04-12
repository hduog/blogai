"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogInput, blogInputExample } from "@/lib/constants";

function DashboardPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([""]);
  const [intro, setIntro] = useState("");
  const [body, setBody] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [viewMode, setViewMode] = useState<"preview" | "source">("source");
  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedHtmlParts, setEditedHtmlParts] = useState<string[]>([]);
  const [language, setLanguage] = useState("English");
  const [primaryColor, setPrimaryColor] = useState("#1d4ed8");
  const [referenceLink, setReferenceLink] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateHtmlContent = async (body: BlogInput) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        setHtmlContent(data.htmlContent);
      } else {
        console.error("Error generating HTML");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "blog-content.html"; // Tên file khi tải về
    document.body.appendChild(a);
    a.click();

    // Dọn dẹp
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const fillWithExample = () => {
    setTitle(blogInputExample.title);
    setDescription(blogInputExample.shortDescription);
    setIntro(blogInputExample.introduction);
    setBody(blogInputExample.body);
    setConclusion(blogInputExample.conclusion);
    setReferenceLink(blogInputExample.referenceLink ?? "");
    setImages(blogInputExample.imageUrls);
    setSocials({
      facebook: blogInputExample.socialLinks.facebook || "",
      twitter: blogInputExample.socialLinks.twitter || "",
      instagram: blogInputExample.socialLinks.instagram || "",
      linkedin: blogInputExample.socialLinks.linkedin || "",
    });
    setPrimaryColor(blogInputExample.mainColor);
    setLanguage(blogInputExample.language);
  };
  const generateHtml = () => {
    if (
      !title ||
      !description ||
      !intro ||
      !body ||
      !conclusion ||
      images.some((url) => !url.trim())
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const params: BlogInput = {
      body,
      conclusion,
      imageUrls: images,
      introduction: intro,
      language: language as "English" | "Vietnamese",
      mainColor: primaryColor,
      shortDescription: description,
      socialLinks: socials,
      title,
      referenceLink,
    };

    generateHtmlContent(params);
  };

  const copyHtml = async () => {
    await navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addImageField = () => setImages([...images, ""]);
  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleAiGenMore = async (index: number, currentText: string) => {
    try {
      setIsGenerating(true);
      const response = await fetch("/api/gen-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: currentText }),
      }).finally(() => {
        setIsGenerating(false);
      });
      if (response.ok) {
        const data = await response.json();
        const updated = [...editedHtmlParts];
        updated[index] = currentText + " " + data.moreContent; // Gộp thêm nội dung
        setEditedHtmlParts(updated);
      } else {
        console.error("Failed to get more content");
      }
    } catch (err) {
      console.error("Error calling AI Gen More:", err);
    }
  };

  function getEditableParts(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const tags = Array.from(
      doc.body.querySelectorAll("p, h1, h2, h3, h4, h5, h6, b, i, u")
    );
    return tags.map((el) => ({
      tag: el.tagName.toLowerCase(),
      text: el.innerHTML,
    }));
  }

  function handleEditChange(index: number, value: string) {
    const updated = [...editedHtmlParts];
    updated[index] = value;
    setEditedHtmlParts(updated);
  }

  function handleSaveEdits() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const editableTags = doc.body.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, b, i, u"
    );
    editableTags.forEach((el, i) => {
      el.innerHTML = editedHtmlParts[i] ?? el.innerHTML;
    });
    setHtmlContent(doc.body.innerHTML);
    setIsEditing(false);
  }
  return (
    <div className="relative">
      {/* Overlay loading */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <div className="text-xl font-semibold animate-pulse">
            Generating HTML...
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 opacity-100">
        {/* LEFT - Form */}
        <div className="space-y-4 border rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold">✍️ Blog Content Input</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={fillWithExample}
            className="mb-2"
          >
            📎 Fill with Example
          </Button>
          {/* Title */}
          <div>
            <Label>
              Title <span className="text-red-500">*</span>
            </Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Language & Color */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Language</Label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="English">English</option>
                <option value="Vietnamese">Vietnamese</option>
              </select>
            </div>
            <div className="flex-1">
              <Label>Primary Color</Label>
              <Input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>
              Short Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Intro/Body/Conclusion */}
          <div>
            <Label>Introduction *</Label>
            <Textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
            />
          </div>
          <div>
            <Label>Body *</Label>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          <div>
            <Label>Conclusion *</Label>
            <Textarea
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
            />
          </div>

          {/* Reference Link */}
          <div>
            <Label>Reference Link</Label>
            <Input
              value={referenceLink}
              onChange={(e) => setReferenceLink(e.target.value)}
            />
          </div>

          {/* Images */}
          <div>
            <Label>Image URLs *</Label>
            {images.map((url, i) => (
              <Input
                key={i}
                value={url}
                onChange={(e) => updateImage(i, e.target.value)}
                className="mb-2"
              />
            ))}
            <Button
              type="button"
              onClick={addImageField}
              variant="outline"
              size="sm"
            >
              ➕ Add Image
            </Button>
          </div>

          {/* Socials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["facebook", "twitter", "instagram", "linkedin"].map((key) => (
              <div key={key}>
                <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <Input
                  value={socials[key as keyof typeof socials]}
                  onChange={(e) =>
                    setSocials({ ...socials, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>

          <Button
            onClick={generateHtml}
            disabled={isGenerating}
            className="mr-3"
          >
            ⚙️ {isGenerating ? "Generating..." : "Generate HTML"}
          </Button>

          {htmlContent && (
            <Button className="mt-4" onClick={downloadHtml}>
              📥 Download HTML
            </Button>
          )}
        </div>

        {/* RIGHT - HTML Preview */}
        <div className="border rounded-lg p-4 shadow-md overflow-auto relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🔍 HTML Preview</h2>
            <div className="space-x-2">
              <Button
                variant={viewMode === "preview" ? "default" : "outline"}
                onClick={() => setViewMode("preview")}
              >
                🔍 Preview
              </Button>
              <Button
                variant={viewMode === "source" ? "default" : "outline"}
                onClick={() => setViewMode("source")}
              >
                💻 Source
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const parts = getEditableParts(htmlContent);
                  setEditedHtmlParts(parts.map((p) => p.text));
                  setIsEditing(!isEditing);
                }}
              >
                📝 {isEditing ? "Cancel Edit" : "Edit Live"}
              </Button>
            </div>
          </div>

          <div className="border p-4 rounded min-h-[400px] text-sm bg-white">
            {htmlContent ? (
              viewMode === "preview" && !isEditing ? (
                <iframe
                  className="w-full h-screen border rounded"
                  srcDoc={
                    '<script src="https://cdn.tailwindcss.com"></script>' +
                    htmlContent
                  }
                  sandbox="allow-same-origin allow-scripts"
                />
              ) : viewMode === "preview" && isEditing ? (
                <div className="space-y-4">
                  {getEditableParts(htmlContent).map((part, index) => {
                    const currentText = editedHtmlParts[index] ?? part.text;
                    return (
                      <div key={index} className="space-y-2">
                        <Textarea
                          value={currentText}
                          onChange={(e) =>
                            handleEditChange(index, e.target.value)
                          }
                          className="w-full"
                          style={{
                            height: `${Math.max(80, currentText.length / 2)}px`,
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAiGenMore(index, currentText)}
                        >
                          🤖 AI Gen More
                        </Button>
                      </div>
                    );
                  })}
                  <Button onClick={handleSaveEdits}>💾 Save</Button>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap font-mono">
                  {htmlContent}
                </pre>
              )
            ) : (
              <p className="text-gray-500 italic">
                HTML will appear here after you fill in the blog details...
              </p>
            )}
          </div>

          {htmlContent && (
            <div className="flex gap-4 mt-4">
              <Button onClick={copyHtml}>
                📋 {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
