<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
   public function index()
    {
        $tasks = TaskResource::collection(Task::latest()->get());
        return response()->json([
            'tasks' => $tasks
        ]);
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'title' => 'required'
        ]);
        Task::create($attributes);

        return response()->json([
            'message' => 'Task has been created.'
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $attributes = $request->validate([
            'title' => 'required'
        ]);

        $task->update($attributes);

        return response()->json([
            'message' => 'Task has been created.'
        ]);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json([
            'message' => 'Task has been deleted.'
        ]);
    }
}
