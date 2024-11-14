import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id?: string; // Make id optional in case it's not set
        }
    }
}

export const isAuthentication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
            return; // Ensure to return after sending the response
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        
        // Check if decoding was successful
        if (!decode || !decode.userId) {
            res.status(401).json({
                success: false,
                message: "Invalid token"
            });
            return; // Ensure to return after sending the response
        }

        req.id = decode.userId; // Set the user ID in the request object
        next(); // Call the next middleware
    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ message: "Internal server error" });
    }
};
