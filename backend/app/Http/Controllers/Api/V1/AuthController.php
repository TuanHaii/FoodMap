<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller {
 public function register(Request $request) { $data=$request->validate(['name'=>['required','string','max:255'],'email'=>['required','email','max:255','unique:users,email'],'phone'=>['nullable','string','max:30'],'password'=>['required','string','min:8','confirmed']]); $user=User::create(['name'=>$data['name'],'email'=>$data['email'],'phone'=>$data['phone']??null,'password_hash'=>Hash::make($data['password']),'role'=>'user']); return response()->json(['data'=>['token'=>$user->createToken('web')->plainTextToken,'token_type'=>'Bearer','user'=>new UserResource($user)]],201); }
 public function login(Request $request) { $data=$request->validate(['email'=>['required','email'],'password'=>['required','string']]); $user=User::where('email',$data['email'])->first(); if (!$user || !Hash::check($data['password'],$user->password_hash)) throw ValidationException::withMessages(['email'=>['The provided credentials are incorrect.']]); return ['data'=>['token'=>$user->createToken('web')->plainTextToken,'token_type'=>'Bearer','user'=>new UserResource($user)]]; }
 public function logout(Request $request) { $request->user()->currentAccessToken()?->delete(); return response()->noContent(); }
}
