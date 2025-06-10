<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class CompleteTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Task $task, Request $request)
    {
        $task->update([
            'completed' => $request->completed
        ]);
        return response()->json([
            'message' => 'Task has been completed'
        ]);
    }
}
