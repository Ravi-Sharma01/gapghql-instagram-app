import 'dotenv/config'
import jwt from 'jsonwebtoken'

class TokenService {

    private static JWT_SECRET = process.env.JWT_SECRET || 'default_secret'
    private static SECRET_EXPIRES_IN = process.env.SECRET_EXPIRES_IN || '15m'
    private static REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'default_refresh_secret'
    private static REFRESH_SECRET_EXPIRES_IN = process.env.REFRESH_SECRET_EXPIRES_IN || '30d'

    public static generateAccessToken(payload: object) {
        return jwt.sign(payload, this.JWT_SECRET, {
            expiresIn: this.SECRET_EXPIRES_IN as any,
        })
    }

    public static generateRefreshToken(payload: object) {
        return jwt.sign(payload, this.REFRESH_SECRET_KEY, {
            expiresIn: this.REFRESH_SECRET_EXPIRES_IN as any
        })
    }

    public static verifyAccessToken(token: string) {
        try {
            return jwt.verify(token, this.JWT_SECRET) as { id: string, email: string };
        } catch (error) {
            if ((error as any).name === "TokenExpiredError") {
               throw new Error('token expired or invalid access toekn')
            }
            console.log("invalid access token or expired");
            return null;
        }
    }

    public static verifyRefreshToken(token: string) {
        try {
            return jwt.verify(token, this.REFRESH_SECRET_KEY) as { id: string, email: string };
        } catch (error) {
            if ((error as any).name === 'TokenExpiredError') {
                throw new Error('token expired or invalid access toekn') 
            }
            console.log('invalid refresh token')
            return null
        }
    }
}

export default TokenService;