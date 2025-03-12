<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $posts = $request->user()->post()->get();

        return Inertia::render('posts/index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'required|image'
        ]);

        $data['user_id'] = $request->user()->id;

        if($request->hasFile('image'))
            $data['image'] = Storage::disk('public')->put('posts', $request->file('image'));

        $request->user()->post()->create($data);

        return redirect('/posts');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post, Request $request)
    {
        if($request->user()->id != $post->user_id) return;

        return Inertia('posts/show', [
            "post" => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post, Request $request)
    {
        if($request->user()->id != $post->user_id) return;

        return Inertia('posts/edit', [
            'currentPost' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        if($request->user()->id != $post->user_id) return;

        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'nullable|image'
        ]);

        $data['user_id'] = $request->user()->id;
        $data['image'] = $post->image;

        if($request->hasFile('image'))
            Storage::disk('public')->delete($post->image);
            $data['image'] = Storage::disk('public')->put('posts', $request->file('image'));

        $post->update($data);

        return redirect('/posts');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post, Request $request)
    {
        if($request->user()->id != $post->user_id) return;
        Storage::disk('public')->delete($post->image);
        $post->delete();

        return redirect('/posts');
    }
}
