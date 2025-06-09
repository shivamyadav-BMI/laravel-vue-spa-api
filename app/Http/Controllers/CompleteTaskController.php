<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class CompleteTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Task $task)
    {
        $task->update([
            'completed' => 1
        ]);
        return response()->json([
            'message' => 'Task has been completed'
        ]);
    }
}
