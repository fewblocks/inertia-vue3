<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ColorsController extends Controller
{
    /**
     * Colors画面
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Colors', [
            'status' => session('status'),
        ]);
    }
}
