<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckManager
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check() || Auth::user()->role !== 'manager') {
            return response()->json(['message' => 'Unauthorized. Manager access required.'], 403);
        }

        return $next($request);
    }
} 