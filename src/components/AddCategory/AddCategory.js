"use client";
import React, { useRef, useState } from "react";

import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/actions/upload";
import { addCategory } from "@/actions/categories";
import { useToast } from "@/hooks/use-toast";

export function AddCategory() {
  const [open, setOpen] = useState(false);
  const isDesktop = true;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when {`you're`}{" "}
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }) {
  const formRef = useRef();
  const { toast } = useToast();

  const handleAddCategory = async (formData) => {
    console.log("formData=>", formData);

    let uploadLink = await uploadImage(formData);
    const obj = {
      title: formData.get("title"),
      description: formData.get("description"),
      thumbnail: uploadLink,
    };
    await addCategory(obj);
    toast({
      title: "Category added successfully",
    });
    formRef?.current?.reset();

  };
  return (
    <form ref={formRef} action={handleAddCategory}>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="sports" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          required
          placeholder="description"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input id="thumbnail" name="thumbnail" type="file" required />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
