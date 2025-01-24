<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Line;



class LearnispiritsLineQuizController extends Controller
{

    public function index ()
    {
        $userId = auth()->id() ?? 1;

        // ランダムに10件取得し、関連するキャラクターをロード
        // また、ユーザーが既にコレクションしているどうかも取得
        // $lines = Line::with('character')->inRandomOrder()->limit(10)->get();
        // return Inertia::render('Auth/LearnispiritsLineQuiz', ['lines' => $lines]);

        $lines = Line::with(['character'])
        // withCountはdeleted_atを自動的には考慮しません。
        // ソフトデリートされたレコードを除外するには、以下のように明示的に条件を指定する必要があります
        ->withCount(['collections' => function($query) use ($userId) {
            $query->where('user_id', $userId)
                  ->whereNull('deleted_at');  // ソフトデリート済みのレコードを除外
        }])
            ->get()
            // TODO: 一旦userId の確認
            ->map(function ($line) use ($userId) {
                return [
                    'id' => $line->id,
                    'character' => $line->character,
                    'line' => $line,
                    // 'feeling' => $line->feeling->label(),
                    'feeling' => $line->feeling,
                    // withCount(['collections'])を使用すると、
                    // 自動的に{relation}_countという命名規則でカウント値が取得されます
                    // この場合はcollections_countというキーで取得できます
                    'has_current_item' => $line->collections_count > 0,
                    // TODO: 一旦userId の確認
                    'console_log_user_id_is_existing' => $userId
                ];
            });

        return Inertia::render('Auth/LearnispiritsLineQuiz', ['lines' => $lines]);
    }


    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
