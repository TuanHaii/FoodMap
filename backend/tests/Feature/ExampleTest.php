<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_api_protects_current_user_endpoint(): void
    {
        $response = $this->getJson('/api/v1/me');

        $response->assertUnauthorized();
    }
}
