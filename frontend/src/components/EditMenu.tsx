import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema"
import { useMenuStore } from "@/store/useMenuStore"
import { MenuItem } from "@/types/restaurantType"

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen }: {
    selectedMenu: MenuItem, editOpen: boolean, setEditOpen: Dispatch<SetStateAction<boolean>>

  }) => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: " ",
    description: "",
    price: 0,
    image: undefined,
  })

  const [error,setError]=useState<Partial<MenuFormSchema>>({});
  const {loading,editMenu} = useMenuStore();


  const changeEventHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value,type}=e.target
    setInput({...input,[name]: type === "number" ? Number(value) : value})
  }
  const submitHandler =async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const filedErrors = result.error.formErrors.fieldErrors;
      setError(filedErrors as Partial<MenuFormSchema>);
      return;
    }
    // console.log(input)
    //Api implementation...
    try{
      const formData = new FormData();
      formData.append("name",input.name);
      formData.append("description",input.description);
      formData.append("price",input.price.toString());
      if(input.image){
        formData.append("image",input.image);
      }
      await editMenu(selectedMenu._id,formData);
      
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    })
  }, [selectedMenu])
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} action="" className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Enter menu name"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
             {
                  error && <span className="text-xs font-medium text-red-600">{error.name}</span>
                }
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Enter menu description"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
             {
                  error && <span className="text-xs font-medium text-red-600">{error.description}</span>
                }
          </div>
          <div>
            <Label>Price in (Rupees)</Label>
            <Input
              type="number"
              placeholder="Enter menu price"
              name="price"
              value={input.price}
              onChange={changeEventHandler}
            />
             {
                  error && <span className="text-xs font-medium text-red-600">{error.price}</span>
                }
          </div>
          <div>
            <Label>Upload Menu Image</Label>
            <Input
              type="file"
              name="image"
              onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })}
            />
              {
                  error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>
                }
          </div>
          <DialogFooter className="mt-5">
            {
              loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-hoverOrange">Submit</Button>
              )
            }

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditMenu