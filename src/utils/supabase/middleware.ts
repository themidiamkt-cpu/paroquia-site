import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
    // Configurable: Redirect unauthenticated users to login
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // refreshing the auth token
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // PROTECTED ROUTES LOGIC
    const path = request.nextUrl.pathname;

    if (path.startsWith("/admin") && !user) {
        // If not logged in and accessing admin, redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (path === "/login" && user) {
        // If logged in and accessing login page, redirect to admin
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
};
