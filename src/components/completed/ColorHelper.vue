<template>
  <div class="mb-1 bg-login-input rounded-lg px-3 py-2 text-sm">
    <p class="flex items-center space-x-2">
      <span class="block w-4 h-4 bg-green-300 rounded-full"></span> <span>{{$t('Correct answer')}}</span>
    </p>
    <p class="flex items-center space-x-2">
      <span class="block w-4 h-4 bg-red-400 rounded-full"></span> <span>{{$t('Wrong answer that is selected')}}</span>
    </p>
    <p class="flex items-center space-x-2">
      <span class="block w-4 h-4 bg-blue-300 rounded-full"></span> <span>{{$t('Correct answer if a wrong selected')}}</span>
    </p>
  </div>
</template>