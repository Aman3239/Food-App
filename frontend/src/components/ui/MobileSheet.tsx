
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { Separator } from "./separator"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { useUserStore } from "@/store/useUserStore"
import { useThemeStore } from "@/store/useThemeStore"


export function SheetDemo() {
    const { user, logout, loading } = useUserStore();
    const {setTheme}=useThemeStore();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={'icon'} className="rounded-full bg-gray-200 text-black hover:bg-gray-200" variant="outline"><Menu size={'18'} /></Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle>Ak-Foods</SheetTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size={"icon"}>
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={()=>setTheme('light')}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={()=>setTheme('dark')}>
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </SheetHeader>
                <Separator className="my-2" />
                <SheetDescription className="flex-1">
                    <Link to={'/profile'} className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                        <User />
                        <span>Profile</span>
                    </Link>
                    <Link to={'/order/status'} className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                        <HandPlatter />
                        <span>Order</span>
                    </Link>
                    <Link to={'/cart'} className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                        <ShoppingCart />
                        <span>Cart (0)</span>
                    </Link>
                    {
                        user?.admin && (
                            <>
                                <Link to={'/admin/menu'} className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                                    <SquareMenu />
                                    <span>Menu</span>
                                </Link>
                                <Link to={'/admin/restaurant'} className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                                    <UtensilsCrossed />
                                    <span>Restaurant</span>
                                </Link>
                                <Link to={'/admin/orders'} className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                                    <PackageCheck />
                                    <span>Restaurant Orders</span>
                                </Link>
                            </>
                        )
                    }

                </SheetDescription>
                <SheetFooter className="flex flex-col gap-4">

                    <div className="flex flex-row items-center gap-2">
                        <Avatar>
                            <AvatarImage src={user?.profilePicture} alt="profilephoto" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="font-bold text-lg">Ak-Mernstack</h1>
                    </div>

                    <SheetClose asChild>
                        {
                            loading ? (
                                <Button className="bg-orange hover:bg-hoverOrange">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button onClick={logout} className="bg-orange hover:bg-hoverOrange">Logout</Button>
                            )
                        }
                    </SheetClose>


                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

